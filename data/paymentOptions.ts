export const automaticPaymentOptions = [
  {
    category: "QRIS",
    methods: [
      {
        id: "e-wallet/qris",
        name: "QRIS",
        icon: "/icons/payment-icons/qris.png",
      },
      // { id: "gopay", name: "GoPay", icon: "/icons/payment-icons/gopay.png" },
      // {
      //   id: "shopeepay",
      //   name: "ShopeePay",
      //   icon: "/icons/payment-icons/shopeepay.png",
      // },
    ],
  },
  {
    category: "Virtual Account",
    methods: [
      {
        id: "bca",
        name: "BCA Virtual Account",
        icon: "/icons/payment-icons/bca.png",
      },
      {
        id: "bni",
        name: "BNI Virtual Account",
        icon: "/icons/payment-icons/bni.png",
      },
      {
        id: "bri",
        name: "BRI Virtual Account",
        icon: "/icons/payment-icons/bri.png",
      },
      {
        id: "mandiri",
        name: "Mandiri Virtual Account",
        icon: "/icons/payment-icons/mandiri.png",
      },
      {
        id: "permata",
        name: "Permata Virtual Account",
        icon: "/icons/payment-icons/permata.png",
      },
    ],
  },
  // {
  //   category: "Credit Card",
  //   methods: [
  //     {
  //       id: "credit_card",
  //       name: "Credit Card",
  //       icon: "/icons/payment-icons/credit-card.png",
  //     },
  //   ],
  // },
];
