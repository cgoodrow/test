import React, { useEffect } from 'react';
import axios from 'axios';

const PurchaseOrder = () => {
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", `${process.env.REACT_APP_COOKIE}`);

// const headers = {
//     withCredentials: true,
//     "Cookie": process.env.REACT_APP_COOKIE,
// }

// http://localhost:84/Wkflow/Queue/LoadWFDiscrepancyQueue

//http://dynmro-dev.dyn-intl.com/workflow/status/requestorderstatus.aspx

        //localhost:84/ajaxpro/DynMRO
        // ajaxpro/DynMRO.Process.Logistics.PurchaseOrderManagement,DynMRO.Process.VB.ashx

        //.env.development is where the REACT_APP_URL can be changed for testing
        const fetchData = () => {
            axios.get(`${process.env.REACT_APP_URL}` + '/workflow/status/requestorderstatus.aspx', {}, {headers: myHeaders})
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        fetchData()
    }, []);
    return (
        <div>Purchase Order</div>
    )
}

export default PurchaseOrder;