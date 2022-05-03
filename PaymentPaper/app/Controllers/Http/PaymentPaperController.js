'use strict'

const { validateAll } = use('Validator')
const Helpers = use('Helpers')
const Drive = use('Drive')
const PaymentFile = use('App/Helpers/PaymentFile')
const PaperFile = use('App/Models/PaperFile')
const rules = require('../../Validators/PaymentPaperStore')

class PaymentPaperController {
    async index({ response }) {
        return response.ok(await PaperFile.query().fetch())
    }

    async store({ request, response, auth }) {
        await validateAll(request.all(), new rules().rules)
        const data = request.all()
        const excelFile = request.file('paymentpaper')
        const user = await auth.getUser()
        data.user = user
        data.type = 'payment'
        
        if (!excelFile) return response.unprocessableEntity('Excel file is required')
        
        const fileName = `${new Date().getTime()}.${excelFile.extname}`
        await excelFile.move(Helpers.tmpPath('uploads/'), {
            name: fileName
        })

        if (!excelFile.moved()) {
            console.log('error')
            return response.badRequest(excelFile.error(), 'Error moving files')
        }

        return response.created(await PaymentFile.storeFile(data, excelFile))
    }

    async storeItems({ request, response, auth }) {
        await validateAll(request.all(), new rules().rules)
        const data = request.all()
        const excelFile = request.file('items')
        const user = await auth.getUser()
        data.user = user
        data.type = 'items'

        if (!excelFile) return response.unprocessableEntity('Excel file is required')

        const fileName = `${new Date().getTime()}.${excelFile.extname}`
        await excelFile.move(Helpers.tmpPath('uploads/rubricas/'), {
            name: fileName
        })

        if (!excelFile.moved()) {
            console.log('error')
            return response.badRequest(excelFile.error(), 'Error moving files')
        }

        const itemsFile = await PaymentFile.storeFile(data, excelFile)
        await PaymentFile.storeItemsData(itemsFile)
        return response.created()
    }

    async release({ request, response }) {
        const data = request.only([
            'filePath',
        ])
        const file = await PaperFile.findByOrFail('path', data.filePath)

        return response.ok(await PaymentFile.getDataToRelease(file))        
    }

    async destroy({ response, params }) {
        const paperFile = await PaperFile.findOrFail(params.id)
        await Drive.delete(paperFile.name)
        await paperFile.delete()
        return response.noContent()
    }
}

module.exports = PaymentPaperController