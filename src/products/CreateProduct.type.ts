type CreateProduct = {
    name : string,
    description : string,
    quantity : number,
    price : number,
    discount: number,
    categoryId? : string
}

export default CreateProduct;