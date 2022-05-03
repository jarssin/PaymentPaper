<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        v-for="paper in papers" :key="paper.id"
      >
        <chart-card
          :chart-data="dataCompletedTasksChart.data"
          :chart-options="dataCompletedTasksChart.options"
          :chart-type="'Line'"
          data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">{{ paper.client_name.split('.')[0] }}</h4>
            <p class="category">{{ paper.type === 'payment' ? 'Folha de Pagamento' : 'Rúbrica' }}</p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              {{ Math.round((new Date() - new Date(paper.created_at)) / (1000 * 3600 * 24))}} dias atrás
            </div>
            <button class='md-button' style="margin-left: 10%" @click="deletePaper(paper.id)">Lançar</button>
          </template>
        </chart-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChartCard,
} from "@/components";

import { apiPaper } from "../Services/PaymentPaperApi"

export default {
  components: {
    ChartCard,
  },
  data() {
    return {
        papers: null,
        paperId: null,
        dataCompletedTasksChart: {
            data: {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
                series: [[230, 750, 450, 300, 280, 240, 200, 190]],
            },
            options: {
            lineSmooth: this.$Chartist.Interpolation.cardinal({
                tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            },
            responsiveOptions: [
            [
                "screen and (max-width: 640px)",
                {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                    return value[0];
                    },
                },
                },
            ],
            ],
        },
        };
    },
    methods: {
        async getPapers() {
            const req = await apiPaper.get('payment-paper')
            const data = req.data
            this.papers = data
        },

        async deletePaper(paperId) {
            await apiPaper.delete(`payment-paper/${paperId}`)
            await this.getPapers()            
        }
    },
    mounted() {
        this.getPapers()
    }
};
</script>
