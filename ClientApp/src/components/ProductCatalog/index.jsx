import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CreateButton from '../helpers/Buttons/CreateButton'
import Catalog from '../Catalog';
import { fetchProductsPaginated, deleteProduct } from '../../redux/actions/product';
import { productsLimit } from '../../redux/helpers/constants';

const selectProducts = state => state.product.data;
const shouldFetch = state => state.product.shouldFetch;
const selectOffset = state => state.product.offset;
const selectProductsCount = state => state.product.productsCount;

const ProductCatalog = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const fetch = useSelector(shouldFetch);
    const offset = useSelector(selectOffset);
    const productsCount = useSelector(selectProductsCount);

    const tableHeaders = [
        { text: 'ID', dataProp: 'id' }, 
        { text: 'Name', dataProp: 'name' }, 
        { text: 'Price', dataProp: 'price' }, 
        { text: 'Category', dataProp: 'category' },
        { text: 'Seller', dataProp: 'seller' }, 
    ];
    
    useEffect(() => {
        dispatch(fetchProductsPaginated(offset))    
    }, []);

    useEffect(() => {
        if (fetch)
            dispatch(fetchProductsPaginated(offset))    
    }, [fetch]);

    const fetchProducts = (offset) => {
        dispatch(fetchProductsPaginated(offset));
    }
    
     
    const products_to_display = products ? products.map(product => ({ ...product,
            seller: product.seller.displayName,
            category: product.category.name
        })) : []
    return (
        <Catalog
            deleteAction={deleteProduct}
            detailUrl="/product/detail"
            title={'Product catalog'}
            actionComponent={<CreateButton link="/create-product" text="Create a product"/>}
            headers={tableHeaders}
            data={products_to_display}
            fetchData={fetchProducts}
            limit={productsLimit}
            offset={offset}
            elementsCount={productsCount}
        >
        </Catalog>
    )
}

export default ProductCatalog;