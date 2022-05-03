'use strict'

const Database = use('Database')
const XLSX = use('xlsx')
const PaperFile = use('App/Models/PaperFile')
const Collaborator = use('App/Models/Collaborator')
const TpConta = use('App/Models/TpConta')
const Item = use('App/Models/Item')
const Env = use('Env')
const Release = use('App/Models/Release')

class PaymentPaper {
    async storeFile(data, file) {
        const excel = await PaperFile.create({
            path: data.type === 'payment' ? `tmp/uploads/${file.fileName}` : `tmp/uploads/rubricas/${file.fileName}`,
            name: file.fileName,
            type: data.type,
            client_name: file.clientName,
            rlsr_user_id: data.user.id,
            company_id: data.company_id,
        })
    
        return excel
    }
    // main
    async getDataToRelease(file) {
        const wb = XLSX.readFile(file.path)
        const ws = wb.Sheets[wb.SheetNames[0]]
        let content = XLSX.utils.sheet_to_csv(ws).split(',')

        // treat the csv
        content = content.filter(element => {
            return element !== ''
        }).map(element => {
            return element.replace(/(\r\n|\n|\r|")/gm, "")
        })

        for (let position = 0; position < content.length; position++) {
            // start of a collaborator data
            if(/Empr\.:|Empr\.:NaN|Contr:/.exec(content[position])) {
                const csvData = this._collaboratorContent(content, position)
                const collaboratorData = await this._getCollaboratorData(csvData)
                let collaborator = await Collaborator.findBy('name', collaboratorData.name)

                if (collaborator) {
                    console.log(`\n${collaborator.name.split(' ')[0]} já está registrado`)
                }
                else {
                    console.log(`${collaboratorData.name}, não registrado`)
                    collaborator = await Collaborator.create({
                        ...collaboratorData,
                        cep: Env.get('DEFAULT_CEP'),
                        address_number: Env.get('DEFAULT_NUMBER')
                    })
                    console.log(`\n${collaborator.name} registrado com sucesso!`)
                }
                // beginning of rubrics
                await this._getCollaboratorItem(csvData, collaborator, file)
            }
        }
    }
    // store rubrics
    async storeItemsData(file) {
        const trx = await Database.beginTransaction()
        const { rows: tpConta } = await TpConta.query().fetch()
        const wb = XLSX.readFile(file.path)
        const ws = wb.Sheets[wb.SheetNames[0]]

        const itemsJson = XLSX.utils.sheet_to_json(ws)

        try {
            for (const conta of tpConta) {
                for (const item of itemsJson) {
                    if (typeof item['Empresa:'] === 'number' && item['__EMPTY_1'] != null) {
                        // checking if item is already saved
                        const rubrica = await Item.query(trx)
                            .where('cd_conta', `${conta.name}-${item['Empresa:']}`)
                            .andWhere('description', item['__EMPTY_1'])
                            .first()
                        
                        if (!rubrica) {
                            console.log(`StoreItemsData: registering rubric ${conta.name}-${item['Empresa:']}: ${item['__EMPTY_1']}`)
                            await Item.create({
                                cd_conta: `${conta.name}-${item['Empresa:']}`,
                                tp_conta: conta.name,
                                description: item['__EMPTY_1'],
                                type: item['__EMPTY_4'].toUpperCase() === 'INF. DEDUTORA' ? 'DESCONTO' : item['__EMPTY_4'].toUpperCase(),
                            }, trx)
                        }
                    }
                }
            }

            await trx.commit()
        }
        catch (error) {
            await trx.rollback()
            console.log(error)
        }
    }

    // create an array only with collaborator data
    _collaboratorContent(content, position) {
        let count = 0
        const auxContent = content.slice(position + 1)
        for (const element of auxContent) {
            if (!/Empr\.:|Empr\.:NaN|Contr:/.exec(element) && element !== Env.get('END_DEPARTMENT')) {
                count++
            }
            else {
                break
            }
        }
        return auxContent.slice(null, count)
    }

    // creates an object with all collaborator data
    async _getCollaboratorData(content) {
        const collaborator = {}
        collaborator.name = content[1] 
        for (let position = 0; position < content.length; position++) {
            if (content[position].toLowerCase() === 'cpf:') {
                collaborator.cpf = content[position + 1]
            }
        }
        return collaborator
    }

    async _getCollaboratorItem(content, collaborator, file) {
        const trx = await Database.beginTransaction()
        let itemsArray = []
        // get only the rubrics piece
        for (let position = 0; position < content.length; position++) {
            if (/Salário:|Salario:/.exec(content[position])) {
                itemsArray = content.slice(position)
                break
            }
        }

        try {
            // check if it is a item
            for (let position = 0; position < itemsArray.length; position++) {
                if (isNaN(itemsArray[position])) {
                    const rubric = await Item.findBy('description', itemsArray[position])
                    if (rubric) {
                        await Release.create({
                            value: rubric.type === 'DESCONTO' ? (`-${itemsArray[position + 3]},${itemsArray[position + 4]}`) : (`${itemsArray[position + 3]},${itemsArray[position + 4]}`),
                            reference: collaborator.name,
                            company_id: file.company_id,
                            item_id: rubric.id,
                            collaborator_id: collaborator.id,
                            file_id: file.id,
                        }, trx)
                        console.log(`Rubrica: ${rubric.description}, valor: ${itemsArray[position + 3]},${itemsArray[position + 4]}`)
                    }
                }
            }
            await trx.commit()
        }
        catch (error) {
            await trx.rollback()
            console.log(error)
        }
    }
}

module.exports = new PaymentPaper()