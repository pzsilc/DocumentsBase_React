import React, { useEffect, useState, createRef } from 'react';
import $ from 'jquery';


const Filters = props => {

    const [displayed, setDisplayed] = useState(false);

    const div = createRef();
    const arrow = createRef();

    useEffect(() => {
        if(displayed){
            $(div.current).slideDown();
        } else {
            $(div.current).slideUp();
        }
    }, [displayed])

    const switchDisplayed = () => setDisplayed(!displayed);

    return(
       <div className="mx-auto w-11/12 lg:w-3/4 xl:w-1/2 border p-5">
            <button
                onClick={switchDisplayed}
                className="text-2xl cursor-pointer"
                type="button"
            >
                Filtry
                <img 
                    className={`ml-2 ${displayed ? 'fa fa-rotate-0' : 'fa fa-rotate-270'}`}  
                    src="https://img.icons8.com/ios/50/000000/expand-arrow--v1.png" 
                    style={{ width: '20px' }}
                    alt="filter-arrow" 
                    ref={arrow}
                />
            </button>
            <form ref={div} className="hidden">
                <div className="flex mt-3 justify-between">
                    <div>
                        <label>
                            <b>Od:</b>
                            <input 
                                type="date" 
                                name="min_date"
                                value={props.filters.min_date}
                                onChange={props.onChange}
                                className="ml-2"
                            />
                        </label>
                        <br/>
                        <p className="fa fa-arrow-down mx-2"></p> 
                        <p className="fa fa-arrow-down mx-2"></p>
                        <p className="fa fa-arrow-down mx-2"></p>
                        <br/>
                        <label>
                            <b>Do:</b>
                            <input 
                                type="date" 
                                name="max_date"
                                value={props.filters.max_date}
                                onChange={props.onChange}
                                className="ml-2"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <b>Powód:</b>
                            <select
                                name="reason"
                                onChange={props.onChange}
                                className="block md:inline-block"
                            >
                                <option value="">Wybierz...</option>
                                {props.reasons.map((reason, key) => 
                                    <option 
                                        key={key}
                                        value={reason.pk}
                                        selected={reason.pk == props.filters.reason}
                                    >{reason.name}</option>
                                )}
                            </select>
                        </label>
                        <br/>
                        <label>
                            <b>Status:</b>
                            <select
                                name="status"
                                onChange={props.onChange}
                                className="block md:inline-block"
                            >
                                <option value="">Wybierz...</option>
                                {props.statuses.map((status, key) => 
                                    <option 
                                        key={key}
                                        value={status.pk}
                                        selected={status.pk == props.filters.status}
                                    >{status.name}</option>
                                )}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="flex mt-5 justify-between">
                    <label>
                        <b>Szukaj:</b>
                        <input 
                            type="text" 
                            name="search"
                            onChange={props.onChange}
                            value={props.filters.search}
                            className="border-b border-gray-300"
                        />
                    </label>
                    <button
                        className="fa fa-times bg-red-500 text-white text-center p-1 px-2"
                        onClick={props.reset}
                        type="button"
                    >
                    </button>
                </div>
            </form>
       </div>
    )
}

export default Filters