import { useSelector } from 'react-redux';


const useAuth = () => {
    const isLoggedIn = useSelector(({auth}) => auth.isLoggedIn);
    const isFetched = useSelector(({auth}) => auth.isFetched);
    const token = useSelector(({auth}) => auth.token);
    const firstName = useSelector(({auth}) => auth.profile.firstName);
    const lastName = useSelector(({auth}) => auth.profile.lastName);
    const username = useSelector(({auth}) => auth.profile.username);
    const phone = useSelector(({auth}) => auth.profile.phone);
    const role = useSelector(({auth}) => auth.profile.role);
    const id = useSelector(({auth}) => auth.profile.id)

    return {
        isLoggedIn,
        isFetched,
        token,
        firstName,
        lastName,
        username,
        phone,
        role,
        id
    }
}

export default useAuth;