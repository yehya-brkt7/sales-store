import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { toast } from "react-toastify";

const wooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_STORE_URL,
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  version: "wc/v3",
});

const wooCommercetest = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_STORE_URL,
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  version: "wc-auth/v3/authorize",
});

async function getAllProducts() {
  try {
    const { data } = await wooCommerce.get("products");

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(id) {
  try {
    const { data } = await wooCommerce.get(`products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductVariations(productId) {
  try {
    const response = await wooCommerce.get(`products/${productId}/variations`, {
      per_page: 100,
    });

    const variations = response.data.map((variation) => {
      // Get the variation's image URLs
      const imageUrls = [
        variation.image?.src || "",
        variation.image?.src || "", // Replace with the actual image properties
        variation.image?.src || "", // Replace with the actual image properties
      ];

      // Return the modified variation object with the desired properties
      return {
        attributes: variation.attributes,
        id: variation.id,
        regularPrice: variation.regular_price,
        salePrice: variation.sale_price,
        imageUrls,
      };
    });
    console.log("variations", variations);

    return variations;
  } catch (error) {
    console.log(error);
  }
}

async function submitRating(data) {
  try {
    const response = await wooCommerce.post("products/reviews", data);

    return response; // Return the response
  } catch (error) {
    throw error; // Throw the error to be caught by the caller
  }
}

async function getRating(productId) {
  wooCommerce
    .get("products/reviews?product_id=" + productId)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

async function updateRating(ratingid, data) {
  wooCommerce
    .put("products/reviews/" + ratingid, data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

async function createCustomer(data, setfunction) {
  wooCommerce
    .post("customers", data)
    .then((response) => {
      setfunction(response.data);
      toast("user created");
    })
    .catch((error) => {
      toast("user already exists");
    });
}

async function getCustomer(email, setfunction) {
  wooCommerce
    .get("customers?email=" + email)
    .then((response) => {
      setfunction(response.data[0]);
    })
    .catch((error) => {});
}

async function getAllCustomers() {
  wooCommerce
    .get("customers")
    .then((response) => {})
    .catch((error) => {});
}

export {
  wooCommerce,
  getAllProducts,
  getProductById,
  getProductVariations,
  getRating,
  submitRating,
  updateRating,
  createCustomer,
  getCustomer,
  getAllCustomers,
};
