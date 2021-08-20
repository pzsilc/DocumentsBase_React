import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDocuments } from '../../api';
import { createNotification } from '../../functions';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';


const List = props => {

    const [documents, setDocuments] = useState([]);
    const [pagesNum, setPagesNum] = useState(0);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        search: "",
        min_date: "",
        max_date: ""
    })

    useEffect(() => {
        fetchDocuments();
    }, [filters, page]);

    const fetchDocuments = () => {
        let category = props.match.params.id;
        getDocuments(props.token, category, filters, page)
        .then(res => {
            console.log(res);
            setPagesNum(res.data.pages_num);
            setDocuments(res.data.data);
        })
        .catch(err => {
            let { data, status } = err.response;
            if(status === 403){
                props.history.push('/');
            }
            createNotification('error', data.data)
        });
    }

    const onChangeFilters = e => {
        var { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    }

    const category = props.user.categories.find(i => i.id === props.match.params.id);
    const categoryName = category ? category.name : "";

    return(
        <div
            className="mx-auto"
            style={{
                width: '90%',
                maxWidth: '1200px'
            }}
        >
            <Link 
                className="h1 fa fa-arrow-left mb-5 text-decoration-none" 
                to="/documents-base/"
            ></Link>
            <form>
                <h1 className="h4 mb-3">Filtry</h1>
                <div className="d-flex justify-content-between">
                    <label style={{ width: '100%' }} className="mr-1">
                        Od:
                        <input
                            type="date"
                            name="min_date"
                            className="form-control"
                            value={filters.min_date}
                            onChange={onChangeFilters}
                        />
                    </label>
                    <label style={{ width: '100%' }} className="ml-1">
                        Do:
                        <input
                            type="date"
                            name="max_date"
                            className="form-control"
                            value={filters.max_date}
                            onChange={onChangeFilters}
                        />
                    </label>
                </div>
                <label style={{ width: '100%' }}>
                    Szukaj:
                    <input
                        type="text"
                        name="search"
                        className="form-control"
                        value={filters.search}
                        onChange={onChangeFilters}
                    />
                </label>
            </form>
            <div className="my-5" style={{ minHeight: '500px' }}>
                <h2 className="h3 mb-5">{categoryName}</h2>
                {Boolean(documents.length) &&
                    <div>
                        <div className="container mb-5">
                            <div className="row">
                                {documents.map((doc, key) => 
                                    <Link 
                                        className="document border p-2 col-6 col-md-3"
                                        key={key}
                                        data-toggle="modal" 
                                        data-target={`#details__modal__${key}`}
                                        to={`/documents-base/documents/${doc.id}`}
                                    >
                                        <div
                                            style={{
                                                backgroundImage: `url(${doc.images[0].file})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '100% 100%',
                                                height: '0',
                                                width: '100%',
                                                paddingBottom: '66%'
                                            }}
                                        >
                                        </div>
                                        <div className="text-center">
                                            <h5 className="mb-2 mt-1">{doc.number}</h5>
                                            <small className="text-muted">Dodano {doc.created_at}</small>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="py-5 my-5">
                            <ReactPaginate
                                pageCount={pagesNum}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                onPageChange={e => setPage(e.selected + 1)}
                                pageClassName="float-left p-1 px-2 border"
                                previousClassName="float-left p-1 px-2 border"
                                nextClassName="float-left p-1 px-2 border"
                                activeClassName="float-left p-1 px-2 border text-white bg-success cursor-pointer border-success"
                                nextLabel=">>"
                                previousLabel="<<"
                            />
                        </div>
                    </div>
                }
                {!documents.length &&
                    <p className="text-muted">Brak dokumentów</p>
                }    
            </div> 
        </div>
    )
}



const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user
})

export const ListContainer = connect(
    mapStateToProps, 
    null
)(List)