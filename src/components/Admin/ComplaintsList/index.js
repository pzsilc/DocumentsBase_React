import React, { useEffect } from 'react';
import complaintsActions from '../../../redux/complaints/actions';
import reasonsActions from '../../../redux/reasons/actions';
import statusesActions from '../../../redux/statuses/actions';
import filtersActions from '../../../redux/filters/actions';
import { connect } from 'react-redux';
import { ComplaintsHandler, ReasonsHandler, StatusesHandler } from '../../../api';
import { Link } from "react-router-dom";
import Filters from './Filters';
import { Notifications } from '../../../functions';
import packageJson from '../../../../package.json';
import ReactPaginate from 'react-paginate';



const AdminComplaintsList = props => {
    
    useEffect(() => {
        ReasonsHandler.getReasons()
        .then(res => props.fetchReasons(res))
        .catch(() => Notifications.create('error', 'Nie udało się pobrać powodów'));
        StatusesHandler.getStatuses()
        .then(res => props.fetchStatuses(res))
        .catch(() => Notifications.create('error', 'Nie udało się pobrać statusów'));
        updateComplaints();
    }, []);

    useEffect(() => updateComplaints(), [props.filters])

    const updateComplaints = () => {
        ComplaintsHandler.getComplaints(props.filters, props.token)
        .then(res => {
            props.fetchComplaintsList(res.results);
            props.setNumOfPages(res.num_of_pages);
        })
        .catch(() => Notifications.create('error', 'Nie udało się pobrać reklamacji'));
    }

    const getColorByExpireDate = date => {
        date = new Date(date);
        let today = new Date();
        const diffTime = Math.abs(today - date);
        const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if(diff >= packageJson.complaintExpiriationDays){
            return ['bg-red-300', 'bg-red-200'];
        } else if(diff >= packageJson.complaintExpiriationDays - 3){
            return ['bg-yellow-300', 'bg-yellow-200'];
        } else {
            return ['bg-green-300', 'bg-green-200'];
        }
    }

    const changePage = ({ selected }) => {
        let page = selected + 1;
        props.filtersOnChange({ target: {
            name: 'page',
            value: page
        } });
    }

    const reset = () => {
        props.filtersReset();
        changePage({ selected: 0 });
        document.querySelectorAll('select').forEach(select => select.value = "")
    }

    return(
        <div>
            <h1 className="text-2xl md:text-5xl text-center mt-10">Panel administratora</h1>
            <div className="mt-16 border p-1 pt-5 md:p-10 w-11/12 md:w-7/12 mx-auto">
                <Filters
                    filters={props.filters}
                    onChange={props.filtersOnChange}
                    reset={reset}
                    statuses={props.statuses}
                    reasons={props.reasons}
                />
                {props.complaints.length !== 0 &&
                    <React.Fragment>
                        <h1 className="text-center mt-10 text-2xl">Lista reklamacji</h1>
                        <div style={{ minHeight: '550px' }}>
                            <table className="text-center table-auto mx-auto mt-10">
                                <thead>
                                    <tr className="bg-green-500">
                                        <th className="w-1/12 hidden xl:inline-block">ID</th>
                                        <th className="w-4/12 xl:w-3/12">Tytuł</th>
                                        <th className="w-5/12 xl:w-2/12">Data dodania</th>
                                        <th className="w-3/12 hidden xl:inline-block">Klient</th>
                                        <th className="w-2/12 xl:w-1/12">Status</th>
                                        <th className="w-1/12 hidden xl:inline-block">Powód</th>
                                        <th className="w-1/12">Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.complaints.map((complaint, key) =>
                                        <tr 
                                            key={key}
                                            className={`align-center ${key % 2 === 0 ? getColorByExpireDate(complaint.created_at)[0] : getColorByExpireDate(complaint.created_at)[1]}`}
                                        >
                                            <td className="hidden xl:block align-middle">{complaint.id}</td>
                                            <td className="align-middle">{complaint.title}</td>
                                            <td className="align-middle">{complaint.created_at.substring(0, 10)}</td>
                                            <td className="hidden xl:block align-middle">{complaint.email}</td>
                                            <td className="align-middle">{complaint.status ? complaint.status.name : ""}</td>
                                            <td className="hidden xl:block align-middle">{complaint.reason ? complaint.reason.name : ""}</td>
                                            <td className="align-middle">
                                                <Link to={`/admin/complaints/${complaint.key}`}>
                                                    <i className="fa fa-sign-in-alt"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="text-center mt-10">
                                <ReactPaginate
                                    pageCount={props.numOfPages}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    breakClassName="inline-block"
                                    breakLinkClassName="inline-block"
                                    onPageChange={changePage}
                                    previousLabel="&laquo;"
                                    nextLabel="&raquo;"
                                    pageClassName="inline-block border p-1 px-2 cursor-pointer"
                                    previousClassName="inline-block border p-1 px-2 cursor-pointer mr-2"
                                    nextClassName="inline-block border p-1 px-2 cursor-pointer ml-2"
                                    activeClassName="inline-block border p-1 px-2 cursor-pointer bg-green-300 text-white border-green-300"
                                />
                            </div>
                        </div>
                    </React.Fragment>
                }
                {!props.complaints.length &&
                    <p className="text-gray-400 text-center mt-10">Brak reklamacji</p>
                }
            </div>
            <div className="mt-16 border p-10 w-11/12 md:w-7/12 mx-auto">
                <i className="fa fa-info mr-2"></i>
                <b>DODATKOWE INFORMACJE</b>
                <ul className="mt-5">
                    <li>Kolor <span className="text-green-300">zielony</span> oznacza reklamację nowo dodaną</li>
                    <li>Kolor <span className="text-yellow-300">żółty</span> oznacza reklamację której termin wykonania jest niedłuższy niż 3 dni</li>
                    <li>Kolor <span className="text-red-300">czerwony</span> oznacza reklamację zaległą. <b>Najwyższy priorytet</b></li>
                </ul>
            </div>
        </div>
    )
}



const mapStateToProps = state => ({
    token: state.token.token,
    complaints: state.complaints.list,
    numOfPages: state.complaints.numOfPages,
    reasons: state.reasons.reasons,
    statuses: state.statuses.statuses,
    filters: state.filters.filters
})

const mapDispatchToProps = dispatch => ({
    fetchComplaintsList: list => dispatch(complaintsActions.fetchComplaintsList(list)),
    setNumOfPages: num => dispatch(complaintsActions.setNumOfPages(num)),
    fetchReasons: reasons => dispatch(reasonsActions.fetchReasons(reasons)),
    fetchStatuses: statuses => dispatch(statusesActions.fetchStatuses(statuses)),
    filtersOnChange: e => dispatch(filtersActions.onChange(e.target.name, e.target.value)),
    filtersReset: () => dispatch(filtersActions.reset())
})

export const AdminComplaintsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminComplaintsList)