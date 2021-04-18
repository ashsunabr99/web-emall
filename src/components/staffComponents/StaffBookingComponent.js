import React from "react";
import { Container, Table, Row, Col, Card } from "react-bootstrap";
import { colors } from "../../constants/theme";
import BookingService from "../../services/clientServices/BookingService";
import MyDate from "../../utils/DateUtils";
import { Button } from "../CustomComponents";
import MallLayout from "./MallLayoutComponent";

class StaffBooking extends React.Component {

    constructor(props) {
        super(props);
        this.deleteBooking = this.deleteBooking.bind(this);
    }

    deleteBooking(bookingId) {
        BookingService.deleteBooking(bookingId)
            .then(response => this.props.refresh())
            .catch(error => console.log(error.message));
    }

    render() {

        const TableHeader = () => {
            return ['# booking ID', 'Seller', 'Space ID', 'Start date', 'End date', 'Revenue', 'Cancel Booking']
                .map((col, index) => <th key={index}>{col}</th>);
        }

        const TableBody = () => {
            let bookings = this.props.user.bookings;
            if (bookings.length === 0) return <tr><td colSpan="6" className="text-center">No Data Available</td></tr>;
            return bookings.map((booking, index) => {
                return (
                    <tr key={index}>
                        <td>{booking.bookingId}</td>
                        <td>{booking.sellerName}</td>
                        <td>{booking.spaceId}</td>
                        <td>{MyDate.format(booking.startDate)}</td>
                        <td>{MyDate.format(booking.endDate)}</td>
                        <td>{booking.revenue}</td>
                        <td>
                            <Button variant="danger" onClick={() => { this.deleteBooking(booking.bookingId) }}
                                size="sm">cancel</Button>
                        </td>
                    </tr>
                );
            })
        }

        return (
            <div className="w-100 d-flex flex-column">
                <MallLayout mall={this.props.mall} user={this.props.user} refresh={this.props.refresh} />
                <Container fluid>
                    <h1 className="pt-5">Your Bookings <Button variant='dark'
                        onClick={this.props.refresh}><span className="fa fa-refresh"></span></Button></h1>
                    <hr />
                    <Row className="justify-content-center mb-5">
                        <Col xs={12} md={10} lg={8}>
                            <Card className="add-shadow-small">
                                <Card.Body className="p-0">
                                    <Table responsive className="m-0">
                                        <thead style={{ background: colors.dark, color: colors.light }}><tr><TableHeader /></tr></thead>
                                        <tbody><TableBody /></tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default StaffBooking;