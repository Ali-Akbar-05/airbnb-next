'use client'
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import {
    GiBarn,
    GiBoatFishing,  GiCactus, GiCastle,
    GiCaveEntrance, GiForestCamp,
    GiIsland, GiWindmill
} from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import { IoDiamond} from 'react-icons/io5'
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
export const categoriesData = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is close to the Windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is close to the Modern'
    }
    ,
    {
        label: 'CountrySIde',
        icon: TbMountain,
        description: 'This property is close to the country Side'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property is close to the Pool'
    }
    ,
    {
        label: 'Island',
        icon: GiIsland,
        description: 'This property is an Island'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is an Lake'
    },
    {
        label: 'Sking',
        icon: FaSkiing,
        description: 'This property has sking activities.'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is in a  castles.'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities.'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property has Arctic.'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is in a cave.'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert.'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in the Barn.'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is luxurious.'
    }
]

const Categories = () => {

    const params = useSearchParams();
    const category = params?.get('category');
    const pathName = usePathname();
    const isMainPage = pathName === "/";

    if (!isMainPage) {
        return null;
    }
    return (
        <div>
            <Container>
                <div className="pt-4 flex flex-row items-center 
                 justify-between overflow-x-auto">
                    {
                        categoriesData.map(item => (
                            <CategoryBox key={item.label}
                                label={item.label}
                                description={item.description}
                                selected={category === item.label}
                                icon={item.icon} />
                        ))
                    }
                </div>
            </Container>

        </div>
    )
}
export default Categories;