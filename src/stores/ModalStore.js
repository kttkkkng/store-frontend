import { defineStore } from 'pinia'
import { useCartStore } from './CartStore.js'
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from "pdfmake/build/vfs_fonts"

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const useModalStore = defineStore('modal', {
  state: () => ({
    open_slip_modal: false,
    slip: '',
  }),
  actions: {
    async ShowSlip () {
      const CartStore = useCartStore()

      pdfMake.createPdf({
        pageOrientation: 'portrait',
        pageSize: {
          width: size(80),
          height: 'auto',
        },
        pageMargins: [size(5), size(5), size(5), size(20)],
        content: [
          {
            layout: 'noBorders',
            table: {
              widths: ['auto', '*', 'auto'],
              body: CartStore.product.flatMap(product => [
                [
                  product.amount,
                  product.product_name,
                  {
                    text: product.amount * product.product_price,
                    alignment: 'right',
                  },
                ],
                [
                  '',
                  {
                    text: '(' + product.product_price + ')',
                    colSpan: 2,
                    color: '#888888',
                    fontSize: 10,
                  },
                  // {
                  //   text: product.amount * product.product_price,
                  //   alignment: 'right',
                  //   colSpan: 3,
                  // },
                ]
                // product.amount,
                // product.product_name,
                // {
                //   text: product.product_price,
                //   alignment: 'right',
                // },
                // {
                //   text: product.amount * product.product_price,
                //   alignment: 'right',
                // },
              ]),
            },
          },
          // {
          //   style: {
          //     color: '',
          //   },
          // }
        ],
      }).getDataUrl(result => {
        this.slip = result + '#toolbar=0'
        this.open_slip_modal = true
      })
    },
  },
})

/**
 * @param {number} millimeter 
 */
function size(millimeter) {
  return millimeter * 2.835
}