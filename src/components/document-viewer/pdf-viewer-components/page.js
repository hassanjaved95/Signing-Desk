import React, { Component, useMemo } from 'react';
import Signature from './signature';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'N/A',
            page: null,
            width: 0,
            height: 0
        };
    }

    pageBoundary = null;
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.pdf !== nextProps.pdf || this.state.status !== nextState.status;
    // }

    componentDidUpdate(nextProps) {
        this._update(nextProps.pdf);
    }

    componentDidMount() {
        const { pdf } = this.props;
        this._update(pdf);
    }

    setCanvasRef = (canvas) => {
        this.canvas = canvas;
    };

    _update = (pdf) => {
        if (pdf) {
            this._loadPage(pdf);
        } else {
            this.setState({ status: 'loading' });
        }
    };

    _loadPage(pdf) {
        if (this.state.status === 'rendering' || this.state.page !== null) return;

        pdf.getPage(this.props.index).then(
            (page) => {
                this.setState({ status: 'rendering' });
                this._renderPage(page);
            }
        );
    }

    _renderPage(page) {
        console.log('_renderPage:', this.props);
        let { scale } = this.props;
        let viewport = page.getViewport(scale);
        let { width, height } = viewport;
        let canvas = this.canvas;
        let context = canvas.getContext('2d');
        console.log(viewport.height, viewport.width);
        canvas.width = width;
        canvas.height = height;

        page.render({
            canvasContext: context,
            viewport
        });

        this.setState({ status: 'rendered', page, width, height });
    }

    dragOver = (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "copy";
    }

    onDrop = (pageNum, pageSigns = [], ev) => {
        const pagePos = this.getPageBoundary();
        const dropPos = {
            pageId: this.props.pageId,
            pageX: Math.abs(ev.pageX - pagePos.left),
            pageY: Math.abs(ev.pageY - pagePos.top),
            width: 120,
            height: 50,
            pageNum,
            recipient: null,
            uiId: this.props.pageId + '-' + (pageSigns.length)
        }

        this.props.onDropSign(dropPos);
    }

    getPageBoundary = () => {
        return document.getElementById(this.props.pageId).getBoundingClientRect();
    }

    render() {
        const { width, height, status } = this.state;
        const { classes, docSigns, pageId, pageNum, marginTop } = this.props;

        return (
            <div id={pageId} onDragOver={this.dragOver} onDrop={this.onDrop.bind(this, pageNum, (docSigns || []).filter(doc => doc.pageId === pageId))} className={`pdf-page ${status} ${classes.pdfPage}`} style={{ width, height, marginTop }}>
                <canvas ref={this.setCanvasRef} />
                {
                    docSigns &&
                    docSigns
                        .filter(doc => doc.pageId === pageId)
                        .map((sign, index) =>
                            <Signature
                                key={`${pageId}-${index}`}
                                sign={sign}
                                signKey={`${pageId}-${index}`}
                                setSelectedSign={this.props.setSelectedSign}
                                selectedSign={this.props.selectedSign}
                                pageBoundary={this.getPageBoundary()}
                                anchorEl={this.props.anchorEl}
                                setAnchorEl={this.props.setAnchorEl}
                                deleteSelectedSign={this.props.deleteSelectedSign}
                                duplicateSelectedSign={this.props.duplicateSelectedSign}
                                setSignDimentions={this.props.setSignDimentions}
                            />
                        )
                }
            </div>
        );
    }
}

export default Page;