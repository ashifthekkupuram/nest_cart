import './address.scss'

const Address = ({ setOpen, data }) => {
    return (
        <div className='address'>
            <div className="modal">
                <span className="close" onClick={() => setOpen({ open: false, data: null })}>
                    X
                </span>
                <h1>Address</h1>
                <div className="detail">
                    {data.fullName}, {data.address1}, {data.address2}, {data.district}, {data.state}, {data.postalCode}, {data.contactNumber}
                </div>
            </div>
        </div>
    )
}

export default Address
