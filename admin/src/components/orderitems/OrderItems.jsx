import './orderitems.scss'

const OrderItems = ({ setOpen, data }) => {
    return (
        <div className='orderitems'>
            <div className="modal">
                <span className="close" onClick={() => setOpen({ open: false, data: null })}>
                    X
                </span>
                <h1>Order Items</h1>
                <table>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                    { data && data.map((item) => {
                        return (
                            <tr>
                                <td>{item.product.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.amount}</td>
                            </tr>
                        )
                    }) }
                </table>
            </div>
        </div>
    )
}

export default OrderItems
