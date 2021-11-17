import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpokes } from "../../../redux/actions/spoke";
import isPresent from "../functions/isPresent";
import { fetchUserSpoke } from "../../../redux/actions/user";
import InputItem from "../../genericComponents/formItems/InputItem";

const selectSpokes = state => state.spoke.data
const selectUserSpoke = state => state.user.user_spoke;

const ToDestinationPicker = ({userRole, setTo, presentSpoke}) => {
    const dispatch = useDispatch();
    const spokes = useSelector(selectSpokes);
    const user_spoke = useSelector(selectUserSpoke);
    useEffect(() => {
        if(userRole === 1)
            dispatch(fetchSpokes())
        if(userRole === 3) {
            dispatch(fetchUserSpoke());
            setTo(user_spoke ? user_spoke.id: "");
        }
    }, [])
    
    if (userRole === 1) {
        return (<label className="col-4">
            To
            <select className="form-select" id="to select"
                onChange={(e) => {
                    e.preventDefault();
                    setTo(e.target.value);
                }}
                    value={presentSpoke ? presentSpoke.id: ""}
            >
                {
                    isPresent(presentSpoke) ?
                        <option disabled hidden value={presentSpoke.id} key={presentSpoke.id}>{presentSpoke.name}</option> :
                        <option value="" disabled hidden />
                }

                {isPresent(spokes) && spokes.map(dest => {
                    return (<option value={dest.id} key={dest.id}>{dest.name}</option>)
                })
                }
            </select>
        </label>)
    }
    else if(userRole === 2)
    {
        return (
            <>
                {presentSpoke &&
                <InputItem name="To" attribute={presentSpoke.name} read_only={true} />}
            </>
        )
    }
    else if (userRole === 3)
    {
        return(
            <InputItem name="To" attribute={user_spoke && user_spoke.name} read_only={true}/>
        )
    }
    else{
        alert("Your role can't be identified")
        return null
    }
};

export default ToDestinationPicker;