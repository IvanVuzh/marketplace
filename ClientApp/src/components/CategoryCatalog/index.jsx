import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CreateButton from '../helpers/Buttons/CreateButton'
import Catalog from '../Catalog';
import { fetchPaginatedCategories, deleteCategory } from '../../redux/actions/category';
import { categoriesLimit } from '../../redux/helpers/constants';

const selectCategories = state => state.category.data;
const shouldFetch = state => state.category.shouldFetch;
const selectOffset = state => state.category.offset;
const selectCategoriesCount = state => state.category.categoriesCount;

const CategoryCatalog = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const fetch = useSelector(shouldFetch);
    const offset = useSelector(selectOffset);
    const categoriesCount = useSelector(selectCategoriesCount);

    const tableHeaders = [
        { text: 'ID', dataProp: 'id' }, 
        { text: 'Name', dataProp: 'name' }, 
        { text: 'Subscription price', dataProp: 'subscriptionPrice' }, 
    ];
    
    useEffect(() => {
        dispatch(fetchPaginatedCategories(offset))    
    }, []);

    useEffect(() => {
        if (fetch)
            dispatch(fetchPaginatedCategories(offset))    
    }, [fetch]);

    const fetchCategories = (offset) => {
        dispatch(fetchPaginatedCategories(offset));
    }
    
    return (
        <Catalog
            deleteAction={deleteCategory}
            detailUrl="/category/detail"
            title={'Category catalog'}
            actionComponent={<CreateButton link="/create-category" text="Create a category"/>}
            headers={tableHeaders}
            data={categories}
            fetchData={fetchCategories}
            limit={categoriesLimit}
            offset={offset}
            elementsCount={categoriesCount}
        >
        </Catalog>
    )
}

export default CategoryCatalog;