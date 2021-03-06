import getPriceRange from "./getPriceRange.js";
import getVariantPriceRange from "./getVariantPriceRange.js";

/**
 *
 * @method getProductPriceRange
 * @summary Get the PriceRange object for a Product by ID
 * @param {String} productId - A product ID
 * @param {Object[]} variants - A list of documents from a Products.find call
 * @returns {Object} Product PriceRange object
 */
export default function getProductPriceRange(productId, variants) {
  const visibleVariants = variants.filter((option) => option.ancestors.length === 1 &&
    option.isVisible && !option.isDeleted);

  // If there are no visible variants, set price range to 0
  if (visibleVariants.length === 0) return getPriceRange([0]);

  let variantPrices = [];
  visibleVariants.forEach((variant) => {
    const { min, max } = getVariantPriceRange(variant._id, variants);
    variantPrices.push(min, max);
  });
  variantPrices = variantPrices.filter((price) => price !== 0);
  return getPriceRange(variantPrices);
}
