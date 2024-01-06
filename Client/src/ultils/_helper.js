import icons from "./icon";


const { AiFillStar, AiOutlineStar } = icons

export const checkNull = (value) => {
    if (
        value == undefined ||
        value == null ||
        value == '' || value == "" ||
        value == 'null'
    )
        return true;
    else return false;
}

export const IsNull = (value) => {
    if (
        value == undefined ||
        value == null ||
        value == '' || value == "" ||
        value == 'null'
    )
        return true;
    else return false;
}

export const totalCart = (cart) => {
    const index = cart.reduce((total, e) => total + (Array.isArray(e.size) ? e?.size?.length : 0), 0) || 0;
    return index
}

export const totalPrice = (user, product) => {
    const data = user?.cart?.filter(e => product.some(el => el === e._id))
    let total = 0; // Initialize total to 0

    if (data && data?.length > 0) {
        for (const e of data) {
            const cash = e.product?.price;
            const quantity = e.quantity
            if (cash) {
                total += (cash * quantity); // Update the total with the product price
            }
        }
    }

    return total;
}


export const convertDateFormat = (inputDate) => {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear()

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}
export const generateRange = (start, end) => {
    const length = end + 1 - start
    return Array.from({ length }, (_, index) => start + index)
}


export const getBase64 = (file) => {
    if (!file) return
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


export const showRating = (number) => {
    if (!Number(number)) return
    const star = []

    if (number == 0) {
        for (let i = 0; i < 6; i++) {
            star.push(<AiFillStar color="orange"  size={18} />)
        }
    } else {
        for (let i = 0; i < +number; i++) {
            star.push(<AiFillStar  color="orange"  size={18}/>)
        }
        for (let i = 5; i > +number; i--) {
            star.push(<AiOutlineStar color="orange" size={18} />)
        }
    }
    return star
}



