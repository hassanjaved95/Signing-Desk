import React, { Component } from 'react';
import $ from "jquery";
import * as jqUI from "jquery-ui";
import Brush from "@material-ui/icons/Brush"

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

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.pdf !== nextProps.pdf || this.state.status !== nextState.status;
    // }

    componentDidUpdate(nextProps) {
        this._update(nextProps.pdf);
        // $(this.refs.resizable)
        // $('.signaturediv').resizable({
        //     handles: "n, e, s, w"
        // });
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

    onDrop = (ev) => {
        // this.setState((currState, props) => {
        //     return {
        //         signs: currState.signs.concat([{
        //             pageX: ev.pageX,
        //             pageY: ev.pageY
        //         }])
        //     }
        // })
        // this.setState({
        //     signs: this.state.signs.concat([{
        //         pageX: ev.pageX,
        //         pageY: ev.pageY
        //     }])
        // }, () => {
        //     console.log('callback:', this.state.signs)
        //     this.render();
        // });

        const pagePos = document.getElementById(this.props.pageId).getBoundingClientRect();
        const dropPos = {
            pageId: this.props.pageId,
            pageX: Math.abs(ev.pageX - pagePos.left),
            pageY: Math.abs(ev.pageY - pagePos.top)
        }

        console.log('pagePos:', pagePos);
        console.log('dropPos:', dropPos);

        this.props.onDropSign(dropPos);
    }

    render() {
        const { width, height, status } = this.state;
        const { classes, docSigns, pageId } = this.props;

        return (
            <div id={pageId} onDragOver={this.dragOver} onDrop={this.onDrop} className={`pdf-page ${status} ${classes.pdfPage}`} style={{ width, height }}>
                <canvas ref={this.setCanvasRef} />
                {
                    docSigns.map((sign, index) =>
                        <div key={`${sign.pageX}-${sign.pageY}-${index}`} className={`${classes.signature} signaturediv`} style={{ top: sign.pageY, left: sign.pageX }}>
                            <div> <Brush /> </div> <div> SIGNATURE </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Page;