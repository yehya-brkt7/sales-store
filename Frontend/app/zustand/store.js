import { create } from "zustand";
import axios from "axios";
import { getAllProducts } from "../lib/woocommerce";
import { getProductVariations } from "../lib/woocommerce";

export const useStore = create((set) => ({
  // handling data
  storeproducts: [],

  setstoreproducts: (value) => set(() => ({ storeproducts: value })),

  cartproduct: {
    name: "",
    price: "",
    id: "",
  },
  setcartproduct: (product) => {
    set({ cartproduct: product });
  },

  productname: "",
  setproductname: (value) => set(() => ({ productname: value })),

  productid: "",
  setproductid: (value) => set(() => ({ productid: value })),

  productvariations: [],
  fetchvariations: async (productid) => {
    const productvars = await getProductVariations(productid);
    set({ productvariations: productvars });
  },

  //handling filters

  selectedcolor: "all",

  setSelectedcolor: (value) => set(() => ({ selectedcolor: value })),

  selectedsize: "all",

  setSelectedsize: (value) => set(() => ({ selectedsize: value })),

  selectedtype: "all",
  setSelectedtype: (value) => set(() => ({ selectedtype: value })),

  productcolor: "red",
  setproductcolor: (value) => set(() => ({ productcolor: value })),

  selectedcategory: "",
  setSelectedcategory: (value) => set(() => ({ selectedcategory: value })),

  pricerange: [0, 1000],
  setPriceRange: (range) => set({ pricerange: range }),

  relatedproducttype: "",
  setrelatedproducttype: (value) => set(() => ({ relatedproducttype: value })),

  colors: [
    { id: 1, value: "blue" },
    { id: 2, value: "red" },
    { id: 3, value: "green" },
    { id: 4, value: "all" },
  ],

  ukshoesizes: [
    { id: 1, value: "3uk / 4us / 35.5eu" },
    { id: 2, value: "4uk / 5us / 37eu" },
    { id: 3, value: "5uk / 6us / 38eu" },
    { id: 4, value: "6uk / 7us / 39eu" },
    { id: 5, value: "7uk / 8us / 40.5eu" },
    { id: 6, value: "8uk / 9us / 42eu" },
    { id: 7, value: "9uk / 10us / 43eu" },
    { id: 8, value: "10uk / 11us / 44.5eu" },
    { id: 9, value: "11uk / 12us / 46eu" },
    { id: 10, value: "12uk / 13us / 47eu" },
    { id: 11, value: "13uk / 14us / 48eu" },
    { id: 12, value: "14uk / 15us / 49.5eu" },
    { id: 12, value: "all" },
  ],

  shirtsizes: [
    { id: 1, value: "S" },
    { id: 2, value: "M" },
    { id: 3, value: "L" },
    { id: 4, value: "XL" },
    { id: 5, value: "XLL" },
    { id: 6, value: "all" },
  ],

  types: [
    { id: 1, value: "nike" },
    { id: 2, value: "adidas" },
    { id: 3, value: "polo" },
    { id: 4, value: "armani" },
    { id: 5, value: "all" },
  ],

  // handling account info

  user: {
    first_name: "",
    email: "",
  },

  setuser: (value) => set(() => ({ user: value })),

  accountfirstname: "",
  setaccountfirstname: (value) => set(() => ({ accountfirstname: value })),

  accountlastname: "",
  setaccountlastname: (value) => set(() => ({ accountlastname: value })),

  accountemail: "",
  setaccountemail: (value) => set(() => ({ accountemail: value })),
}));
