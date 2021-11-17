import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CreateButton from '../helpers/Buttons/CreateButton'
import Catalog from '../Catalog';
import {deleteUser, fetchPaginatedUsers} from '../../redux/actions/user';
import { userRoles } from '../helpers/Enums/roles'
import { usersLimit } from '../../redux/helpers/constants';

const selectUsers = state => state.user.data;
const shouldFetch = state => state.user.shouldFetch;
const selectOffset = state => state.user.offset;
const selectUsersCount = state => state.user.usersCount;

const UserCatalog = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const fetch = useSelector(shouldFetch);
    const offset = useSelector(selectOffset);
    const usersCount = useSelector(selectUsersCount);

    const tableHeaders = [
        { text: 'ID', dataProp: 'id' }, 
        { text: 'Rating', dataProp: 'rating' }, 
        { text: 'Role', dataProp: 'role' }, 
        { text: 'E-mail', dataProp: 'email' }, 
        { text: 'Login name', dataProp: 'loginName' },
        { text: 'Display name', dataProp: 'displayName' }, 
    ];
    
    useEffect(() => {
        dispatch(fetchPaginatedUsers(offset))
    }, []);

    useEffect(() => {
        if (fetch)
            dispatch(fetchPaginatedUsers(offset))
    }, [fetch]);

    const fetchUsers = (offset) => {
        dispatch(fetchPaginatedUsers(offset));
    }
    
     
    const users_to_display = users ? users.map(user => ({ ...user,
            role: userRoles[user.role]
        })) : []
    return (
        <Catalog
            deleteAction={deleteUser}
            detailUrl="/user/update"
            title={'User catalog'}
            actionComponent={<CreateButton link="/create-user" text="Create a user"/>}
            headers={tableHeaders}
            data={users_to_display}
            fetchData={fetchUsers}
            limit={usersLimit}
            offset={offset}
            elementsCount={usersCount}
        >
        </Catalog>
    )
}

export default UserCatalog;