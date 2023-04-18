'use client'
import qs from 'query-string';
import useSearchModel from "@/app/hooks/useSearchModel";
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
};

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();

    const searchModal = useSearchModel();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathRoomCount, setBathRoomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), []);


    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }
        let currentQuery = {}
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathRoomCount,
        };
        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {
            skipNull: true
        })
        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [step, searchModal, location, router, guestCount, roomCount, bathRoomCount
        , dateRange, onNext, params])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return "Search";
        }
        return "Next";
    }, [step])

    const secendaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return "Back";
    }, [step])

    let BodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading title='Where do you wanna go'
                subTitle='Find the perfect location' />

            <CountrySelect value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />

        </div>
    )
    if (step === STEPS.DATE) {
        BodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='When do u plan to go'
                    subTitle='Make sure everyone is free' />
                <Calendar value={dateRange}
                    onChange={(value) => setDateRange(value.selection)} />
            </div>

        )
    }
    if (step === STEPS.INFO) {
        BodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='More information' subTitle='Find your perfect place!' />
                <Counter title="Guests"
                    subTitle='How many guests are comming?'
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)} />
                <Counter title="Rooms"
                    subTitle='How many rooms do you need?'
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)} />
                <Counter title="Bathrooms"
                    subTitle='How many bathrooms do you need?'
                    value={bathRoomCount}
                    onChange={(value) => setBathRoomCount(value)} />
            </div>
        )
    }

    return (
        <Modal isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secendaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}

            body={BodyContent}
        />
    )
}
export default SearchModal;
