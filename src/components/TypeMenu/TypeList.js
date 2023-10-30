import { BorderAllRounded, MopedRounded, PedalBikeRounded, TwoWheelerRounded } from "@mui/icons-material"

const TypeList = [
    {
        icon: <BorderAllRounded />,
        text: 'Tất cả',
        type: 0
    },
    {
        icon: <PedalBikeRounded />,
        text: 'Xe Số',
        type: 1
    },
    {
        icon: <MopedRounded />,
        text: 'Xe Tay ga',
        type: 2
    },
    {
        icon: <TwoWheelerRounded />,
        text: 'Xe Phân khối lớn',
        type: 3
    },
]

export default TypeList