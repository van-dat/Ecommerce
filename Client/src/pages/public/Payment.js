
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import * as apis from '../../apis'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {getCurrentUser} from '../../store/action'
import { useNavigate } from "react-router-dom";
import Path from "../../ultils/path";
import Swal from "sweetalert2";
// This value is from the props in the UI
const style = { "layout": "vertical" };



// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, currency, amount, payload , reduxDispatch}) => {

   const navigate = useNavigate()
    
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: { ...options, currency: currency }
        })
    }, []);


    const handleOrder = async () => {
        console.log('object')
        const response = await apis.apiCreateOrder(payload)
        reduxDispatch(getCurrentUser())
        Swal.fire({text:'Thanh toán thành công', icon:'Success'}).then(()=> navigate(`/${Path.CART}`))
    }




    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, action) => {
                    
                        return action.order.create({
                            purchase_units: [{ amount: { currency_code: currency, value: amount } }]
                        }).then(orderId => orderId)
                    
                    
                }}
                onApprove={(data, action) => action.order.capture().then(async (response) => {
                    console.log(response)
                    console.log(payload)
                    if (response.status === 'COMPLETED') {
                        handleOrder()
                    }
                })}
            />
        </>
    );
}

export default function Payment({ amount, payload }) {

    
    const dispatch = useDispatch()

    return (
        <div style={{ maxWidth: "750px", minHeight: "80px" }}>
            <PayPalScriptProvider options={{ clientId: "AayRMX1TYKRJGX9uCH7goYVsN4ADfsA3wGSYnF4w4rXC-PWcI3cxUsidZmO2SjFZgL2O460mpwY4E_di",  components: "buttons", currency: "USD", disableFunding: 'card' }}>
                <ButtonWrapper reduxDispatch= {dispatch} payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
        
    );
}