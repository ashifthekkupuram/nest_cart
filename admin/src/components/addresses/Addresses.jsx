import './addresses.scss'

const Addresses = ({ setOpen, data }) => {
    return (
        <div className='addresses'>
            <div className="modal">
                <span className="close" onClick={() => setOpen({ open: false, data: null })}>
                    X
                </span>
                <h1>View Addresses</h1>
                <div className="viewAddresses">
                    { data.length > 0 ? data.map((address) => {
                        return (
                            <div key={address._id} className="address">
                                { address.fullName }, { address.address1 }, { address.address2 }, { address.district }, { address.state }, { address.postalCode }, { address.contactNumber }
                            </div>
                        )
                    }) : <div className="noAddress">No Address were added</div> }
                </div>
            </div>
        </div>
    )
}

export default Addresses
