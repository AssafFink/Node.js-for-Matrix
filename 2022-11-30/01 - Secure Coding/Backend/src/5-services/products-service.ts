import dal from "../2-utils/dal";

async function getAllProducts() {

    const sql = `
        SELECT
            ProductID as id,
            ProductName as name,
            UnitPrice as price,
            UnitsInStock as stock
        FROM products`;

    const products = await dal.execute(sql);
    
    return products;
}


export default {
    getAllProducts
};
