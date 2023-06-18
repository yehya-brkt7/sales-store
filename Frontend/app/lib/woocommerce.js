import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const wooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_STORE_URL,
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  version: "wc/v3",
  // axiosConfig: {
  //   headers: {},
  // },
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
  } catch (error) {}
}

// async function getProductById(id) {
//   try {
//     const { data } = await wooCommerce.get(`products/${id}`);
//     return data;
//   } catch (error) {}
// }
const productCache = {};

async function getProductById(id) {
  try {
    if (productCache[id]) {
      // Return the cached product if available
      return productCache[id];
    } else {
      // Fetch the product data from the server
      const { data } = await wooCommerce.get(`products/${id}`);

      // Cache the product data
      productCache[id] = data;

      return data;
    }
  } catch (error) {}
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
        stock_quantity: variation.stock_quantity,
      };
    });

    return variations;
  } catch (error) {}
}

async function getVariation(productid, variationid) {
  try {
    const response = wooCommerce.get(
      `products/${productid}/variations/${variationid}`
    );
    return response;
  } catch {}
}

async function updateVariation(productid, variationid, data) {
  try {
    const response = wooCommerce.put(
      `products/${productid}/variations/${variationid}`,
      data
    );
    return response;
  } catch {}
}

async function submitRating(data) {
  try {
    const response = await wooCommerce.post("products/reviews", data);
    return { response }; // Return the response
  } catch (error) {}
}
async function getRating(productId, email) {
  try {
    const response = await wooCommerce.get(
      `products/reviews?product=${productId}`
    );
    const allReviews = response.data;

    // Filter reviews based on the email address
    const filteredReviews = allReviews.filter(
      (review) => review.reviewer_email === email
    );

    return filteredReviews;
  } catch (error) {}
}

async function updateRating(ratingid, data) {
  wooCommerce
    .put("products/reviews/" + ratingid, data)
    .then((response) => {})
    .catch((error) => {});
}

async function createCustomer(data, setfunction) {
  try {
    const response = await wooCommerce.post("customers", data);
    setfunction(response.data);
    return response;
  } catch (error) {}
}

async function getCustomer(email, setFunction) {
  try {
    const response = await wooCommerce.get("customers?email=" + email);
    setFunction(response.data[0]);
    return response;
  } catch (error) {}
}

async function getAllCustomers() {
  wooCommerce
    .get("customers")
    .then((response) => {})
    .catch((error) => {});
}

async function updateCustomer(id, data) {
  try {
    const response = wooCommerce.put(`customers/${id}`, data);
    return response;
  } catch {}
}

async function createOrder(data) {
  wooCommerce
    .post("orders", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {});
}

async function getOrders() {
  try {
    const response = await wooCommerce.get("orders");
    return response.data;
  } catch (error) {}
}

async function updateOrder(id, data) {
  wooCommerce
    .put(`orders/${id}`, data)
    .then((response) => {})
    .catch((error) => {});
}

async function deleteOrder(id) {
  wooCommerce
    .delete(`orders/${id}`, {
      force: true,
    })
    .then((response) => {})
    .catch((error) => {});
}

async function getCustomerOrderHistory(customerId) {
  try {
    const response = wooCommerce.get(`orders?customer=${customerId}`);
    return response;
  } catch (error) {}
}

async function getPaymentGatewayUrl(data, url) {
  wooCommerce
    .get(`payment_gateways/${data}`)
    .then((response) => {
      return url;
    })
    .catch((error) => {});
}
export {
  wooCommerce,
  getAllProducts,
  getProductById,
  getProductVariations,
  getRating,
  getVariation,
  updateVariation,
  submitRating,
  updateRating,
  createCustomer,
  getCustomer,
  getAllCustomers,
  updateCustomer,
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  getCustomerOrderHistory,
  getPaymentGatewayUrl,
};
