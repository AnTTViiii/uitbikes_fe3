const ProductData = [
    {
        p_id: 1,
        brand_id: 1,
        name: 'CB150R The Streetster',
        cc: 150, 
        date: 2022, 
        type_id: 3, 
        is_active: 1,
        describe: `
        Aliquam in quam nec turpis cursus mollis. Curabitur vel nisi vehicula, mattis felis at, tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus fermentum convallis eleifend. Pellentesque porttitor diam eu magna dictum, a ullamcorper urna euismod. Suspendisse laoreet rutrum ipsum, at ultricies ante facilisis in. Aliquam vestibulum augue eget orci accumsan pellentesque. Integer vestibulum id erat et pellentesque. Vestibulum dignissim lorem ac felis aliquet, in porttitor erat dictum. Nam volutpat finibus sem, nec cursus turpis malesuada ac. Ut sit amet nisl commodo, luctus enim nec, placerat eros. Nulla iaculis erat augue, ut iaculis ipsum facilisis ut.

        Mauris eget vestibulum dolor. Nam nec enim ligula. Vivamus ullamcorper nisi sed nisl accumsan, hendrerit mollis velit vehicula. Pellentesque non dapibus urna. Sed vehicula, velit ut congue porttitor, quam lectus fringilla ante, ac pellentesque nulla erat in lectus. Integer condimentum viverra orci, nec vulputate augue maximus at. Donec sit amet nulla et massa sodales accumsan. Proin egestas magna nulla, vitae auctor est lacinia vel.
        `,
        detail: [
            {
                p_color_id: 1,
                color: 'Đen',
                price: 105500000,
                image: 'https://drive.google.com/uc?export=view&id=1aaKn42E3w1adgUOUrZts9znaEZGwcmQt',
                quantity: 100,
            }
        ]
    },
    {
        p_id: 2,
        brand_id: 1,
        name: 'Gold Wing',
        cc: 1833, 
        date: 2022, 
        type_id: 3, 
        is_active: 1, 
        describe: `
        Aliquam in quam nec turpis cursus mollis. Curabitur vel nisi vehicula, mattis felis at, tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus fermentum convallis eleifend. Pellentesque porttitor diam eu magna dictum, a ullamcorper urna euismod. Suspendisse laoreet rutrum ipsum, at ultricies ante facilisis in. Aliquam vestibulum augue eget orci accumsan pellentesque. Integer vestibulum id erat et pellentesque. Vestibulum dignissim lorem ac felis aliquet, in porttitor erat dictum. Nam volutpat finibus sem, nec cursus turpis malesuada ac. Ut sit amet nisl commodo, luctus enim nec, placerat eros. Nulla iaculis erat augue, ut iaculis ipsum facilisis ut.

        Mauris eget vestibulum dolor. Nam nec enim ligula. Vivamus ullamcorper nisi sed nisl accumsan, hendrerit mollis velit vehicula. Pellentesque non dapibus urna. Sed vehicula, velit ut congue porttitor, quam lectus fringilla ante, ac pellentesque nulla erat in lectus. Integer condimentum viverra orci, nec vulputate augue maximus at. Donec sit amet nulla et massa sodales accumsan. Proin egestas magna nulla, vitae auctor est lacinia vel.
        `,
        detail: [
            {
                p_color_id: 2,
                color: 'Đen',
                price: 123100000,
                image: 'https://drive.google.com/uc?export=view&id=1UfSDBup4SEc0W7Je8yCaGTswCa3PGGlQ',
                quantity: 80
            },
            {
                p_color_id: 3,
                color: 'Trắng',
                price: 123100000,
                image: 'https://drive.google.com/uc?export=view&id=14jGioKcCOexLHua14pgiVWpsVB_BLoOy',
                quantity: 45
            }
        ]
    },
    {
        p_id: 3,
        brand_id: 1,
        name: 'Future 125 FI',
        cc: 125, 
        date: 2020, 
        type_id: 1, 
        is_active: 1,
        describe: `
        Aliquam in quam nec turpis cursus mollis. Curabitur vel nisi vehicula, mattis felis at, tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus fermentum convallis eleifend. Pellentesque porttitor diam eu magna dictum, a ullamcorper urna euismod. Suspendisse laoreet rutrum ipsum, at ultricies ante facilisis in. Aliquam vestibulum augue eget orci accumsan pellentesque. Integer vestibulum id erat et pellentesque. Vestibulum dignissim lorem ac felis aliquet, in porttitor erat dictum. Nam volutpat finibus sem, nec cursus turpis malesuada ac. Ut sit amet nisl commodo, luctus enim nec, placerat eros. Nulla iaculis erat augue, ut iaculis ipsum facilisis ut.

        Mauris eget vestibulum dolor. Nam nec enim ligula. Vivamus ullamcorper nisi sed nisl accumsan, hendrerit mollis velit vehicula. Pellentesque non dapibus urna. Sed vehicula, velit ut congue porttitor, quam lectus fringilla ante, ac pellentesque nulla erat in lectus. Integer condimentum viverra orci, nec vulputate augue maximus at. Donec sit amet nulla et massa sodales accumsan. Proin egestas magna nulla, vitae auctor est lacinia vel.
        `,
        detail: [
            {
                p_color_id: 4,
                color: 'Trắng, đen',
                price: 31506545,
                image: 'https://drive.google.com/uc?export=view&id=1rIRt6mu8yAqRLlXATkk3NEuMmm8T4k8p',
                quantity: 165
            },
            {
                p_color_id: 5,
                color: 'Xanh, đen',
                price: 31506545,
                image: 'https://drive.google.com/uc?export=view&id=1xJ7olabRClnFdGhgJ7t2fiVTD2OkmRKs',
                quantity: 58
            },
            {
                p_color_id: 6,
                color: 'Đỏ, đen',
                price: 31506545,
                image: 'https://drive.google.com/uc?export=view&id=1vRbvi33-pUqN9qYgaODrlJBg7s1F7x2E',
                quantity: 100
            },
            {
                p_color_id: 7,
                color: 'Đen',
                price: 31997455,
                image: 'https://drive.google.com/uc?export=view&id=1QzsQ37Du0xVp96xLv4rvdQDu7ZhS3iKc',
                quantity: 60
            },
            {
                p_color_id: 8,
                color: 'Xanh, đen',
                price: 31997455,
                image: 'https://drive.google.com/uc?export=view&id=1eHhmBkrcfzhYkgRyAYg5YpRXDlXFySdp',
                quantity: 58
            },
            {
                p_color_id: 9,
                color: 'Đỏ, đen',
                price: 30328363,
                image: 'https://drive.google.com/uc?export=view&id=1-QzDaQnxVPPn672ANhtYRX5j-ov9DpB8',
                quantity: 100
            },
            {
                p_color_id: 10,
                color: 'Đen',
                price: 30328363,
                image: 'https://drive.google.com/uc?export=view&id=1uHXSJg8DIcMA966gLvhf-CmFslwradhP',
                quantity: 60
            }
        ]
    },
    {
        p_id: 4,
        brand_id: 4,
        name: 'Star SR 170 (ABS)',
        cc: 175, 
        date: 2019, 
        type_id: 1, 
        is_active: 1, 
        describe: `
        Aliquam in quam nec turpis cursus mollis. Curabitur vel nisi vehicula, mattis felis at, tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus fermentum convallis eleifend. Pellentesque porttitor diam eu magna dictum, a ullamcorper urna euismod. Suspendisse laoreet rutrum ipsum, at ultricies ante facilisis in. Aliquam vestibulum augue eget orci accumsan pellentesque. Integer vestibulum id erat et pellentesque. Vestibulum dignissim lorem ac felis aliquet, in porttitor erat dictum. Nam volutpat finibus sem, nec cursus turpis malesuada ac. Ut sit amet nisl commodo, luctus enim nec, placerat eros. Nulla iaculis erat augue, ut iaculis ipsum facilisis ut.

        Mauris eget vestibulum dolor. Nam nec enim ligula. Vivamus ullamcorper nisi sed nisl accumsan, hendrerit mollis velit vehicula. Pellentesque non dapibus urna. Sed vehicula, velit ut congue porttitor, quam lectus fringilla ante, ac pellentesque nulla erat in lectus. Integer condimentum viverra orci, nec vulputate augue maximus at. Donec sit amet nulla et massa sodales accumsan. Proin egestas magna nulla, vitae auctor est lacinia vel.
        `,
        detail: [
            {
                p_color_id: 11,
                color: 'Đen, đỏ',
                price: 52400000,
                image: 'https://drive.google.com/uc?export=view&id=1mhy8i4MnFR3br83PYIWN5PH5_xs7t2KD',
                quantity: 20
            },
            {
                p_color_id: 12,
                color: 'Đen, xanh',
                price: 52400000,
                image: 'https://drive.google.com/uc?export=view&id=1J5TEbB7bZmdO4sAj-7JFsw7x5jK7C_ig',
                quantity: 15
            }
        ]
    },
    {
        p_id: 5,
        brand_id: 3,
        name: 'Exciter 150 Phiên bản RC',
        cc: 150, 
        date: 2020, 
        type_id: 1, 
        is_active: 1, 
        describe: `
        Aliquam in quam nec turpis cursus mollis. Curabitur vel nisi vehicula, mattis felis at, tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus fermentum convallis eleifend. Pellentesque porttitor diam eu magna dictum, a ullamcorper urna euismod. Suspendisse laoreet rutrum ipsum, at ultricies ante facilisis in. Aliquam vestibulum augue eget orci accumsan pellentesque. Integer vestibulum id erat et pellentesque. Vestibulum dignissim lorem ac felis aliquet, in porttitor erat dictum. Nam volutpat finibus sem, nec cursus turpis malesuada ac. Ut sit amet nisl commodo, luctus enim nec, placerat eros. Nulla iaculis erat augue, ut iaculis ipsum facilisis ut.

        Mauris eget vestibulum dolor. Nam nec enim ligula. Vivamus ullamcorper nisi sed nisl accumsan, hendrerit mollis velit vehicula. Pellentesque non dapibus urna. Sed vehicula, velit ut congue porttitor, quam lectus fringilla ante, ac pellentesque nulla erat in lectus. Integer condimentum viverra orci, nec vulputate augue maximus at. Donec sit amet nulla et massa sodales accumsan. Proin egestas magna nulla, vitae auctor est lacinia vel.
        `,
        detail: [
            {
                p_color_id: 13,
                color: 'Đen',
                price: 44800000,
                image: 'https://drive.google.com/uc?export=view&id=1uFNkc1uXKlt7mm8pkK9M959pjwTaCUP9',
                quantity: 15,
            },
            {
                p_color_id: 14,
                color: 'Đỏ, đen',
                price: 44800000,
                image: 'https://drive.google.com/uc?export=view&id=1Ikgbtb4Qn70XnBJr7yFnOabNL8pRMNUG',
                quantity: 15,
            },
            {
                p_color_id: 15,
                color: 'Xám, đen, cam',
                price: 44800000,
                image: 'https://drive.google.com/uc?export=view&id=1ZbmmA4A5JElgkjC_0jySUWqicYNvUlcO',
                quantity: 15,
            },
            {
                p_color_id: 16,
                color: 'Trắng, đỏ, đen',
                price: 44800000,
                image: 'https://drive.google.com/uc?export=view&id=1tpbV7pXJZPjPe6KSotLIozXRaAZQ_fvZ',
                quantity: 15,
            }
        ]
    },
    {
        p_id: 6,
        brand_id: 2,
        name: 'Lead 125cc Cao cấp',
        cc: 125, 
        date: 2022, 
        type_id: 2, 
        is_active: 1, 
        describe: `
        Aliquam in quam nec turpis cursus mollis. Curabitur vel nisi vehicula, mattis felis at, tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus fermentum convallis eleifend. Pellentesque porttitor diam eu magna dictum, a ullamcorper urna euismod. Suspendisse laoreet rutrum ipsum, at ultricies ante facilisis in. Aliquam vestibulum augue eget orci accumsan pellentesque. Integer vestibulum id erat et pellentesque. Vestibulum dignissim lorem ac felis aliquet, in porttitor erat dictum. Nam volutpat finibus sem, nec cursus turpis malesuada ac. Ut sit amet nisl commodo, luctus enim nec, placerat eros. Nulla iaculis erat augue, ut iaculis ipsum facilisis ut.

        Mauris eget vestibulum dolor. Nam nec enim ligula. Vivamus ullamcorper nisi sed nisl accumsan, hendrerit mollis velit vehicula. Pellentesque non dapibus urna. Sed vehicula, velit ut congue porttitor, quam lectus fringilla ante, ac pellentesque nulla erat in lectus. Integer condimentum viverra orci, nec vulputate augue maximus at. Donec sit amet nulla et massa sodales accumsan. Proin egestas magna nulla, vitae auctor est lacinia vel.
        `,
        detail: [
            {
                p_color_id: 17,
                color: 'Xanh',
                price: 41226545,
                image: 'https://drive.google.com/uc?export=view&id=145mJpDQ1Le766TAbEa3DDbRN4XOXrrXz',
                quantity: 100,
            },
            {
                p_color_id: 18,
                color: 'Xám',
                price: 41226545,
                image: 'https://drive.google.com/uc?export=view&id=1YM-k1CRMxH5xP_aDh0XlUkPzteIVFXnB',
                quantity: 100,
            }
        ]
    },
    {
        p_id: 7,
        brand_id: 2,
        name: 'Burgman Street',
        cc: 125, 
        date: 2022, 
        type_id: 2, 
        is_active: 1, 
        describe: `
        Aliquam in quam nec turpis cursus mollis. Curabitur vel nisi vehicula, mattis felis at, tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus fermentum convallis eleifend. Pellentesque porttitor diam eu magna dictum, a ullamcorper urna euismod. Suspendisse laoreet rutrum ipsum, at ultricies ante facilisis in. Aliquam vestibulum augue eget orci accumsan pellentesque. Integer vestibulum id erat et pellentesque. Vestibulum dignissim lorem ac felis aliquet, in porttitor erat dictum. Nam volutpat finibus sem, nec cursus turpis malesuada ac. Ut sit amet nisl commodo, luctus enim nec, placerat eros. Nulla iaculis erat augue, ut iaculis ipsum facilisis ut.

        Mauris eget vestibulum dolor. Nam nec enim ligula. Vivamus ullamcorper nisi sed nisl accumsan, hendrerit mollis velit vehicula. Pellentesque non dapibus urna. Sed vehicula, velit ut congue porttitor, quam lectus fringilla ante, ac pellentesque nulla erat in lectus. Integer condimentum viverra orci, nec vulputate augue maximus at. Donec sit amet nulla et massa sodales accumsan. Proin egestas magna nulla, vitae auctor est lacinia vel.
        `,
        detail: [
            {
                p_color_id: 19,
                color: 'Xám Mờ Vàng Đồng',
                price: 48600000,
                image: 'https://drive.google.com/uc?export=view&id=1qIqUyf_ylxL2ei73SPBBfXq_Pi64UC48',
                quantity: 100,
            },
            {
                p_color_id: 20,
                color: 'Đen Vàng Đồng',
                price: 48600000,
                image: 'https://drive.google.com/uc?export=view&id=1OmwC1hv3aZ4xddSIuqPlv-EKTCQc6qZc',
                quantity: 100,
            },
            {
                p_color_id: 21,
                color: 'Trắng Vàng Đồng',
                price: 48600000,
                image: 'https://drive.google.com/uc?export=view&id=1qQwZzDPyIFdDfDjQ9EjaQtnvBlL4pPmd',
                quantity: 100,
            }
        ]
    },
    {
        p_id: 8,
        brand_id: 3,
        name: 'Latte Phiên bản Giới hạn',
        cc: 125, 
        date: 2022, 
        type_id: 2, 
        is_active: 1, 
        describe: `
        Aliquam in quam nec turpis cursus mollis. Curabitur vel nisi vehicula, mattis felis at, tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus fermentum convallis eleifend. Pellentesque porttitor diam eu magna dictum, a ullamcorper urna euismod. Suspendisse laoreet rutrum ipsum, at ultricies ante facilisis in. Aliquam vestibulum augue eget orci accumsan pellentesque. Integer vestibulum id erat et pellentesque. Vestibulum dignissim lorem ac felis aliquet, in porttitor erat dictum. Nam volutpat finibus sem, nec cursus turpis malesuada ac. Ut sit amet nisl commodo, luctus enim nec, placerat eros. Nulla iaculis erat augue, ut iaculis ipsum facilisis ut.

        Mauris eget vestibulum dolor. Nam nec enim ligula. Vivamus ullamcorper nisi sed nisl accumsan, hendrerit mollis velit vehicula. Pellentesque non dapibus urna. Sed vehicula, velit ut congue porttitor, quam lectus fringilla ante, ac pellentesque nulla erat in lectus. Integer condimentum viverra orci, nec vulputate augue maximus at. Donec sit amet nulla et massa sodales accumsan. Proin egestas magna nulla, vitae auctor est lacinia vel.
        `,
        detail: [
            {
                p_color_id: 22,
                color: 'Bạc',
                price: 38300000,
                image: 'https://drive.google.com/uc?export=view&id=18tCqNwXWezZz0VQuebFOkV4Bg5wQaBdo',
                quantity: 100,
            }
        ]
    },
    {
        p_id: 9,
        brand_id: 2,
        name: 'Satria F150',
        cc: 150, 
        date: 2022, 
        type_id: 3, 
        is_active: 1, 
        describe: `
        Aliquam in quam nec turpis cursus mollis. Curabitur vel nisi vehicula, mattis felis at, tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus fermentum convallis eleifend. Pellentesque porttitor diam eu magna dictum, a ullamcorper urna euismod. Suspendisse laoreet rutrum ipsum, at ultricies ante facilisis in. Aliquam vestibulum augue eget orci accumsan pellentesque. Integer vestibulum id erat et pellentesque. Vestibulum dignissim lorem ac felis aliquet, in porttitor erat dictum. Nam volutpat finibus sem, nec cursus turpis malesuada ac. Ut sit amet nisl commodo, luctus enim nec, placerat eros. Nulla iaculis erat augue, ut iaculis ipsum facilisis ut.

        Mauris eget vestibulum dolor. Nam nec enim ligula. Vivamus ullamcorper nisi sed nisl accumsan, hendrerit mollis velit vehicula. Pellentesque non dapibus urna. Sed vehicula, velit ut congue porttitor, quam lectus fringilla ante, ac pellentesque nulla erat in lectus. Integer condimentum viverra orci, nec vulputate augue maximus at. Donec sit amet nulla et massa sodales accumsan. Proin egestas magna nulla, vitae auctor est lacinia vel.
        `,
        detail: [
            {
                p_color_id: 23,
                color: 'Đen',
                price: 59000000,
                image: 'https://drive.google.com/uc?export=view&id=12WTDJ-HSaYJAt2eI4XcV5oc5WBlp_4nG',
                quantity: 100,
            }
        ]
    },
    {
        p_id: 10,
        brand_id: 3,
        name: 'Tracer 9',
        cc: 890, 
        date: 2022, 
        type_id: 3, 
        is_active: 1, 
        describe: `
        Aliquam in quam nec turpis cursus mollis. Curabitur vel nisi vehicula, mattis felis at, tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus fermentum convallis eleifend. Pellentesque porttitor diam eu magna dictum, a ullamcorper urna euismod. Suspendisse laoreet rutrum ipsum, at ultricies ante facilisis in. Aliquam vestibulum augue eget orci accumsan pellentesque. Integer vestibulum id erat et pellentesque. Vestibulum dignissim lorem ac felis aliquet, in porttitor erat dictum. Nam volutpat finibus sem, nec cursus turpis malesuada ac. Ut sit amet nisl commodo, luctus enim nec, placerat eros. Nulla iaculis erat augue, ut iaculis ipsum facilisis ut.

        Mauris eget vestibulum dolor. Nam nec enim ligula. Vivamus ullamcorper nisi sed nisl accumsan, hendrerit mollis velit vehicula. Pellentesque non dapibus urna. Sed vehicula, velit ut congue porttitor, quam lectus fringilla ante, ac pellentesque nulla erat in lectus. Integer condimentum viverra orci, nec vulputate augue maximus at. Donec sit amet nulla et massa sodales accumsan. Proin egestas magna nulla, vitae auctor est lacinia vel.
        `,
        detail: [
            {
                p_color_id: 24,
                color: 'Đỏ',
                price: 369000000,
                image: 'https://drive.google.com/uc?export=view&id=1FlzG7mnd6MzZFX-Q39f9CJZ0nyS44qBr',
                quantity: 100,
            },
            {
                p_color_id: 25,
                color: 'Đen',
                price: 369000000,
                image: 'https://drive.google.com/uc?export=view&id=1KZK8Pc0x3-GPOZwQ23GceaGsisQJIlfm',
                quantity: 50,
            }
        ]
    }
]

export default ProductData;