/**
 * Ecommerce Dashboard
 */

import React, { Component } from 'react'
import { Helmet } from "react-helmet";
import { getDashboard } from "Actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import IntlMessages from 'Util/IntlMessages';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import {
	VisitorAreaChartWidget,
	SalesAreaChartWidget,
	OrdersAreaChartWidget,
	RecentOrdersWidget,
	SupportRequest,
	Notifications,
	TopSellingWidget,
	OverallTrafficStatusWidget,
	ProductReportsWidget,
	OnlineVisitorsWidget,
	TodayOrdersStatsWidget,
	BookingInfo,
	NewOrderCountdown,
	FollowersWidget,
	Notes
} from "Components/Widgets";

// widgets data
import {
	visitorsData,
	salesData,
	ordersData,
	topSellingProducts,
	trafficStatus,
	onlineVisitorsData,
} from './data';

import {
	Card,
	CardText,
	CardTitle,
	Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

class EcommerceDashboard extends Component {

	state = {
		className: 'text-muted',
		mouseOver: true
	};

	componentDidMount() {
		this.props.getDashboard();
	}

	mouseOut = () => {
		this.setState({ mouseOver: false });
	}

	mouseOver = () => {
		this.setState({ mouseOver: true });
	}

	render() {
		const { match, dashboard } = this.props;
		return (

			<div className="ecom-dashboard-wrapper">
				<Helmet>
					<title>SigningDesk Dashboard</title>
					<meta name="description" content="SigningDesk Dashboard" />
				</Helmet>
				{/* <PageTitleBar title={<IntlMessages id="sidebar.ecommerce" />} match={match} /> */}
				<div className="row">
					<div className="col-sm-12 col-md-4 mb-30">
						<Link to="#">
							<Card body
							>
								<CardText className='text-muted'>All</CardText>
								<CardText className='text-muted' style={{ fontWeight: '700', fontSize: '52px', lineHeight: '1' }}>
									{
										dashboard &&
										dashboard.all}
									{/* <span className='text-muted' style={{ fontWeight: '400', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>documents</span> */}
								</CardText>
								<CardText className='text-muted'>Workflows</CardText>
							</Card>
						</Link>
					</div>
					<div className="col-sm-12 col-md-4 mb-30">
						<Link to="#">
							<Card body inverse
								style={{ backgroundColor: '#ff9045', borderColor: '#ff9045' }}
							>
								<CardText className={this.state.mouseOver ? '' : 'text-muted'}>ToDo</CardText>
								<CardText style={{ fontWeight: '700', fontSize: '52px', lineHeight: '1' }}>
								{
										dashboard &&
										dashboard.toDo}
									{/* <span style={{ fontWeight: '400', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>documents</span> */}
								</CardText>
								<CardText>Workflows</CardText>
							</Card>
						</Link>
					</div>
					<div className="col-sm-12 col-md-4 mb-30">
						<Link to="#">
							<Card body inverse
								style={{ backgroundColor: '#008643', borderColor: '#008643' }}
							>
								<CardText className={this.state.mouseOver ? '' : 'text-muted'}>In Progress</CardText>
								<CardText style={{ fontWeight: '700', fontSize: '52px', lineHeight: '1' }}>
									{dashboard &&
										dashboard.inProgress
									}
									{/* <span style={{ fontWeight: '400', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>documents</span> */}
								</CardText>
								<CardText>Workflows</CardText>
							</Card>
						</Link>
					</div>

				</div>
				<div className="row">
					<div className="col-sm-12 col-md-4 mb-30">
						<Link to="#">
							<Card body inverse
								style={{ backgroundColor: '#216afc', borderColor: '#216afc' }}
							>
								<CardText className={this.state.mouseOver ? '' : 'text-muted'}>Completed</CardText>
								<CardText style={{ fontWeight: '700', fontSize: '52px', lineHeight: '1' }}>
									{
										dashboard &&
										dashboard.completed
									}
									{/* <span style={{ fontWeight: '400', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>document</span> */}
								</CardText>
								<CardText>Workflows</CardText>
							</Card>
						</Link>
					</div>
					<div className="col-sm-12 col-md-4 mb-30">
						<Link to="#">
							<Card body inverse
								style={{ backgroundColor: '#e44e48', borderColor: '#e44e48' }}
							>
								<CardText className={this.state.mouseOver ? '' : 'text-muted'}>Declined</CardText>
								<CardText style={{ fontWeight: '700', fontSize: '52px', lineHeight: '1' }}>
									{dashboard &&
										dashboard.declined
									}
									{/* <span style={{ fontWeight: '400', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>documents</span> */}
								</CardText>
								<CardText>Workflows</CardText>
							</Card>
						</Link>
					</div>
					<div className="col-sm-12 col-md-4 mb-30">
						<Link to="#">
							<Card body inverse
								style={{ backgroundColor: '#942925', borderColor: '#942925' }}
							>
								<CardText className={this.state.mouseOver ? '' : 'text-muted'}>Expired</CardText>
								<CardText style={{ fontWeight: '700', fontSize: '52px', lineHeight: '1' }}>
									{
										dashboard &&
										dashboard.expired
									}
									{/* <span style={{ fontWeight: '400', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>documents</span> */}
								</CardText>
								<CardText>Workflows</CardText>
							</Card>
						</Link>
					</div>

					{/* <div className="col-sm-12 col-md-4 mb-30">
						<Link to="#">
							<Card body inverse
								style={{ backgroundColor: '#47b972', borderColor: '#47b972' }}
							>
								<CardText className={this.state.mouseOver ? '' : 'text-muted'}>Completed</CardText>
								<CardText style={{ fontWeight: '700', fontSize: '52px', lineHeight: '1' }}>
									3
									<span style={{ fontWeight: '400', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>documents</span>
								</CardText>
								<CardText>$0.00</CardText>
							</Card>
						</Link>
					</div> */}

				</div>
				<div className="row">
					{/* <div className="col-sm-12 col-md-4 mb-30">
						<Link to="#">
							<Card body inverse
								style={{ backgroundColor: '#9a44a9', borderColor: '#9a44a9' }}
							>
								<CardText className={this.state.mouseOver ? '' : 'text-muted'}>Cancelled</CardText>
								<CardText style={{ fontWeight: '700', fontSize: '52px', lineHeight: '1' }}>
									35
									<span style={{ fontWeight: '400', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>documents</span>
								</CardText>
								<CardText>Workflows</CardText>
							</Card>
						</Link>
					</div> */}
					{/* <div className="col-sm-12 col-md-4 mb-30">
						<Link to="#">
							<Card body inverse
								style={{ backgroundColor: '#249c57', borderColor: '#249c57' }}
							>
								<CardText className={this.state.mouseOver ? '' : 'text-muted'}>Waiting for payment</CardText>
								<CardText style={{ fontWeight: '700', fontSize: '52px', lineHeight: '1' }}>
									7
									<span style={{ fontWeight: '400', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>documents</span>
								</CardText>
								<CardText>$0.00</CardText>
							</Card>
						</Link>
					</div> */}


				</div>
				{/*<div className="row">
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
						heading={<IntlMessages id="widgets.supportRequest" />}
						collapsible
						reloadable
						closeable
						fullBlock
						customClasses="overflow-hidden"
					>
						<SupportRequest />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-8 col-lg-8 w-xs-full"
						heading={<IntlMessages id="widgets.RecentOrders" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<RecentOrdersWidget />
					</RctCollapsibleCard>
				</div>
				<div className="row">
					<RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="col-sm-12 col-md-12 col-lg-5 d-sm-full"
						heading={<IntlMessages id="widgets.overallTrafficStatus" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<OverallTrafficStatusWidget
							chartData={trafficStatus}
						/>
					</RctCollapsibleCard>
					<div className="col-sm-12 col-md-12 col-lg-7 d-sm-full">
						<div className="row">
							<div className="col-sm-6 col-md-6 col-lg-6">
								<div className="dash-cards">
									<Notes />
								</div>
								<NewOrderCountdown />
								<TodayOrdersStatsWidget />
							</div>
							<div className="col-sm-6 col-md-6 col-lg-6">
								<div className="dash-cards-lg">
									<OnlineVisitorsWidget data={onlineVisitorsData} />
								</div>
								<FollowersWidget />
								<BookingInfo />
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
						heading={<IntlMessages id="widgets.productReports" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<ProductReportsWidget />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
						fullBlock
						customClasses="overflow-hidden"
					>
						<Notifications />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
						heading={<IntlMessages id="widgets.topSellings" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<TopSellingWidget data={topSellingProducts} />
					</RctCollapsibleCard>
				</div> */}
			</div>
		)
	}
}

const mapStateToProps = ({ documents }) => {
	return documents;
};

export default withRouter(
	connect(mapStateToProps,
		{

			getDashboard
		}
	)(EcommerceDashboard)
);
