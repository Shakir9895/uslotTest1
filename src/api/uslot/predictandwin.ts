import { AllPlusTwoListSlice, AllSslcListSlice } from "src/redux/slices/app";
import axios from "../../utils/Uslotaxios";
import { store } from "src/redux/store";
//getsslcDetalilsapiCall
export const getSslcDetailsApiCall = async () => {

    try {
        const res = await axios.get('/api/v1/score-prediction?class=SSLC', {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        if (res.status === 200) {
            console.log(res)
            store.dispatch(AllSslcListSlice({ data: res.data }))
        }

    } catch (err) {
        store.dispatch(AllSslcListSlice({ data: [] }))
    }

}


//getPlusTwo DetailsApiCall
export const getPlusTwoDetailsApiCall = async () => {

    try {
        const res = await axios.get('/api/v1/score-prediction?class=Plus Two', {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        if (res.status === 200) {
            console.log(res)
            store.dispatch(AllPlusTwoListSlice({ data: res.data }))
        }

    } catch (err) {
        store.dispatch(AllPlusTwoListSlice({ data: [] }))
    }

}