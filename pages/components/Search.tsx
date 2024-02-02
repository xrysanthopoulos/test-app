import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '../styles/ToggleSwitch.module.css';
import ToggleSwitchStyles from '../styles/ToggleSwitch.module.css';
import SearchFormStyle from '../styles/SearchForm.module.css';

const Search = () => {
    return (
        <>
            <ToggleSwitch leftLabel='Εκδρομές' rightLabel='Ξενοδοχεία' />
            <SearchForm />
        </>
    )
}

export default Search



interface ToggleSwitchProps {
    leftLabel: string;
    rightLabel: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ leftLabel, rightLabel }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={ToggleSwitchStyles['switches-container']}>
            <input type="radio" id="switchMonthly" name="switchPlan" value="Monthly" checked={isChecked} onChange={handleToggle} />
            <input type="radio" id="switchYearly" name="switchPlan" value="Yearly" checked={!isChecked} onChange={handleToggle} />
            <label htmlFor="switchMonthly" className={isChecked ? ToggleSwitchStyles['active-label'] : ''}>{leftLabel}</label>
            <label htmlFor="switchYearly" className={!isChecked ? ToggleSwitchStyles['active-label'] : ''}>{rightLabel}</label>
        </div>
    );
};

const SearchForm = () => {
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [isOpenLocation, setIsOpenLocation] = useState(false);
    const [isOpenGuest, setIsOpenGuest] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCheckIn, setSelectedCheckIn] = useState('');
    const [selectedCheckOut, setSelectedCheckOut] = useState('');
    const [selectedGuest, setSelectedGuest] = useState('');
    const [positionRef, setPositionRef] = useState([]);

    const locationRef = useRef(null);
    const calendarRef = useRef(null);
    const guestRef = useRef(null);
    const [dropdownType, setDropdownType] = useState('location');

    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);

    const [cities] = useState(['New York', 'Los Angeles', 'London', 'Paris', 'Tokyo']);
    const [hotels] = useState(['Hotel A', 'Hotel B', 'Hotel C', 'Hotel D', 'Hotel E']);

    const handleLocationClick = () => {
        setIsOpenLocation(!isOpenLocation);
        setIsOpenDate(false);
        setDropdownType('location');
        setPositionRef(locationRef);
    };

    const handleCitySelect = (city) => {
        setSelectedLocation(city);
        setIsOpenLocation(false);
        if (isOpenLocation) {
            setIsOpenDate(true);
            setDropdownType('calendar');
            setPositionRef(calendarRef);
        }
    };

    const handleCheckinInputClick = () => {
        setIsOpenDate(!isOpenDate);
        setIsOpenLocation(false);
        setDropdownType('calendar');
        setPositionRef(calendarRef);
    };

    const handleCheckoutInputClick = () => {
        setIsOpenDate(true);
        setIsOpenLocation(false);
        setDropdownType('calendar');
        setPositionRef(calendarRef);
    }

    const handleCalendarSelect = (checkInDate, checkOutDate) => {
        setSelectedCheckIn(checkInDate);

        if (checkOutDate) {
            setSelectedCheckOut(checkOutDate);
        } else {
            setIsOpenDate(true);
            setDropdownType('calendar');
            setPositionRef(calendarRef);
        }
    };

    const handleGuestInputClick = () => {
        setIsOpenGuest(true);
        setIsOpenDate(false);
        setDropdownType('guest');
        setPositionRef(guestRef);
        if (guestRef.current) guestRef.current.focus();
    };

    const handleGuestSelect = (data) => {
        setSelectedGuest(data);
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <div className={SearchFormStyle["search-form-container"]}>
                <div className={SearchFormStyle["search-inputs"]}>
                    <div className={SearchFormStyle["input-container"]}>
                        <input
                            type="text"
                            id="location"
                            placeholder="Ελλάδα"
                            value={selectedLocation}
                            onClick={handleLocationClick}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            ref={locationRef}
                            readOnly
                        />
                        <label htmlFor="input" className={focused ? SearchFormStyle.active : ''}>
                            Προορισμός
                        </label>
                    </div>
                    <div className={SearchFormStyle["input-container"]}>
                        <input
                            type="text"
                            id="check-in"
                            placeholder="Ημερομηνία"
                            value={selectedCheckIn}
                            onClick={handleCheckinInputClick}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            ref={calendarRef}
                            readOnly
                        />
                        <label htmlFor="input" className={focused ? SearchFormStyle.active : ''}>
                            Check In
                        </label>
                    </div>
                    <div className={SearchFormStyle["input-container"]}>
                        <input
                            type="text"
                            id="check-out"
                            placeholder="Ημερομηνία"
                            value={selectedCheckOut}
                            onClick={handleCheckoutInputClick}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly
                        />
                        <label htmlFor="input" className={focused ? SearchFormStyle.active : ''}>
                            Check Out
                        </label>
                    </div>
                    <div className={SearchFormStyle["input-container"]}>
                        <input
                            type="text"
                            id="guest"
                            placeholder={selectedGuest}
                            onClick={handleGuestInputClick}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            ref={guestRef}
                            readOnly
                        />
                        <label htmlFor="input" className={focused ? SearchFormStyle.active : ''}>
                            Αριθμός ατόμων
                        </label>
                    </div>
                    <button className={SearchFormStyle.button}>
                        Αναζήτηση
                    </button>

                    <DropdownMenu isOpen={isOpenLocation || isOpenDate || isOpenGuest} targetRef={positionRef}>
                        {dropdownType === 'location' && (
                            <LocationDropdown cities={cities} hotels={hotels} handleCitySelect={handleCitySelect} />
                        )}
                        {dropdownType === 'calendar' && (
                            <CalendarDropdown handleCalendarSelect={handleCalendarSelect} />
                        )}
                        {dropdownType === 'guest' && (
                            <GuestDropdown handleGuestSelect={handleGuestSelect} />
                        )}
                    </DropdownMenu>
                </div>
            </div>
        </>
    );
};


const LocationDropdown = ({ cities, hotels, handleCitySelect }) => (
    <div className={SearchFormStyle["location-dropdown"]}>
        <div className={SearchFormStyle["city-section"]}>
            <h2 className={SearchFormStyle.titleCity}>Cities</h2>
            {cities && cities.map((city, index) => (
                <div className={SearchFormStyle.locationCity} key={index} onClick={() => handleCitySelect(city)}>{city}</div>
            ))}
        </div>
        {false ? (
            <div className={SearchFormStyle.hotelSection}>
                <h3>Hotels</h3>
                {hotels && hotels.map((hotel, index) => (
                    <div key={index}>{hotel}</div>
                ))}
            </div>
        ) : <></>}
    </div>
);

const CalendarDropdown = ({ handleCalendarSelect }) => (
    <div className={SearchFormStyle["location-dropdown"]}>
        <HotelDatePicker handleCalendarSelect={handleCalendarSelect} />
    </div>
);

const GuestDropdown = ({ handleGuestSelect }) => {
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [selectedGuest, setSelectedGuest] = useState('');

    const incrementAdult = () => {
        setAdultCount(adultCount + 1);
    };

    const decrementAdult = () => {
        if (adultCount > 0) {
            setAdultCount(adultCount - 1);
        }
    };

    const incrementChild = () => {
        setChildCount(childCount + 1);
    };

    const decrementChild = () => {
        if (childCount > 0) {
            setChildCount(childCount - 1);
        }
    };

    const handleGuestClick = () => {
        const guestString = `${adultCount} Ενηλίκες, ${childCount} Παιδιά`;
        handleGuestSelect(guestString); 
    };

    useEffect(() => {
        setSelectedGuest(`${adultCount} Ενηλίκες, ${childCount} Παιδιά`);
    }, [adultCount, childCount]);

    const guestInputRef = useRef(null);

    useEffect(() => {
        if (guestInputRef.current) {
            guestInputRef.current.focus();
        }
    }, []);

    return (
        <div className={SearchFormStyle["guest-section"]} onClick={handleGuestClick}>
            <div className={SearchFormStyle["adults"]}>
                <div className='text'>
                    <h3 className={SearchFormStyle.title}>Ενηλίκες</h3>
                    <span>12 ετών+</span>
                </div>
                <Counter value={adultCount} onIncrement={incrementAdult} onDecrement={decrementAdult} />
            </div>
            <div className={SearchFormStyle["children"]}>
                <div className='text'>
                    <h3>Παιδιά</h3>
                    <span>Έως 12 ετών</span>
                </div>
                <Counter value={childCount} onIncrement={incrementChild} onDecrement={decrementChild} />
            </div>
        </div>
    );
};




const Counter = ({ value, onIncrement, onDecrement }) => {
    return (
        <div className={SearchFormStyle["counter"]}>
            <div className={SearchFormStyle["counter-btn"]} onClick={onDecrement}>-</div>
            <div className={SearchFormStyle["counter-value"]}>{value}</div>
            <div className={SearchFormStyle["counter-btn"]} onClick={onIncrement}>+</div>
        </div>
    );
};

const DropdownMenu = ({ isOpen, targetRef, children }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef(null);

    const calculatePosition = () => {
        if (targetRef.current && isOpen) {
            const { top, left, height } = targetRef.current.getBoundingClientRect();
            const dropdownHeight = dropdownRef.current.clientHeight;
            const viewportHeight = window.innerHeight;

            if (top + height + dropdownHeight <= viewportHeight) {
                setPosition({ top: top + height, left });
            } else {
                setPosition({ top: top - dropdownHeight, left });
            }
        }
    };

    useLayoutEffect(() => {
        calculatePosition();
    }, [isOpen, targetRef]);
    
    useEffect(() => {
        const handleResize = () => {
            calculatePosition();
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [calculatePosition]);

    return (
        <div
            ref={dropdownRef}
            className={`${SearchFormStyle['dropdown-content']} ${isOpen ? SearchFormStyle['open'] : ''}`}
            style={{ top: position.top, left: position.left }}
        >
            {children}
        </div>
    );
}

const HotelDatePicker = ({ handleCalendarSelect }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateClick = (date) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        if (typeof date === 'number') {
            date = new Date(currentYear, currentMonth, date);
        }

        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else if (startDate && !endDate && date >= startDate) {
            setEndDate(date);
            handleCalendarSelect(formatDate(startDate), formatDate(date));
        } else if (startDate && !endDate && date < startDate) {
            setEndDate(startDate);
            setStartDate(date);
        } else if (startDate && endDate) {
            setStartDate(date);
            setEndDate(null);
        }
    };




    const renderCalendar = (monthOffset, selectedStartDate, selectedEndDate) => {
        const today = new Date();
        const currentMonth = today.getMonth() + monthOffset;
        const year = today.getFullYear();
        const month = (currentMonth + 12) % 12;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

        // Calculate the day of the week for the first day of the month
        const firstDayOfWeek = new Date(year, month, 1).getDay();

        // Add empty placeholders for the days before the first day of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className={SearchFormStyle.calendarDay}></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            let classNames = SearchFormStyle.calendarDay;
            const currentDate = new Date(year, month, i);
            if (selectedStartDate && currentDate.getTime() === selectedStartDate.getTime()) {
                classNames += ` ${SearchFormStyle.selectedStart}`;
            } else if (selectedEndDate && currentDate.getTime() === selectedEndDate.getTime()) {
                classNames += ` ${SearchFormStyle.selectedEnd}`;
            } else if (selectedStartDate && selectedEndDate && currentDate > selectedStartDate && currentDate < selectedEndDate) {
                classNames += ` ${SearchFormStyle.selectedRange}`;
            }

            days.push(
                <div
                    key={i}
                    className={classNames}
                    onClick={() => handleDateClick(currentDate)}
                >
                    {i}
                </div>
            );
        }

        return (
            <div className={SearchFormStyle["calendar-month"]}>
                <div className={SearchFormStyle["calendar-header"]}>{`${monthNames[month]} ${year}`}</div>
                <div className={SearchFormStyle["calendar-days-grid"]}>
                    {dayNames.map(day => (
                        <div key={day} className={SearchFormStyle.calendarDayName}>{day}</div>
                    ))}
                    {days}
                </div>
            </div>
        );
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className={SearchFormStyle["hotel-date-picker"]}>
            <div className={SearchFormStyle["calendar-container"]}>
                {renderCalendar(0, startDate, endDate)}
                {renderCalendar(1, startDate, endDate)}
            </div>
        </div>
    );
};
