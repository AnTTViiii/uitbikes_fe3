import { Slide } from "@mui/material";
import { forwardRef } from "react";

export const dot3digits = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getTypeName = (x) => {
    let type = '';
    switch(x) {
        case 1: type = 'Xe số'; break;
        case 2: type = 'Xe tay ga'; break;
        case 3: type = 'Xe phân khối lớn'; break;
        default: break;
    }
    return type;
};

export const getBrandName = (x) => {
    let brand = '';
    switch(x) {
        case 1: brand = 'Honda'; break;
        case 2: brand = 'Suzuki'; break;
        case 3: brand = 'Yamaha'; break;
        case 4: brand = 'SYM'; break;
        default: break;
    }
    return brand;
};

export const getItemQuantity = (item) => {
    let qty = 0;
    item.map((i) => (qty += i.quantity));
    return qty;
}

export const getInvoiceStatusName = (status) => {
    let name = '';
    switch(status) {
        case 0: name = "Chờ xác nhận"; break;
        case 1: name = "Đang giao"; break;
        case 2: name = "Đã giao"; break;
        case 3: name = "Đã hủy"; break;
        default: break;
    }
    return name;
}

export const getChargeRequestStatusName = (status) => {
    let name = '';
    switch(status) {
        case 0: name = "Chờ xác nhận"; break;
        case 1: name = "Đã duyệt"; break;
        case 2: name = "Từ chối"; break;
        default: break;
    }
    return name;
}

export const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const getInvoiceStatusNotify = (status) => {
    if (status === 1) return "đang được giao";
    else if (status === 2) return "đã được giao";
    else return "đã bị hủy"
}