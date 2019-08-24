import React, { Component } from 'react';
import * as PdfJs from 'pdfjs-dist';

// Components
import Viewer from 'Components/document-viewer/pdf-viewer-components/viewer';

const PDF_BASE_URL = 'http://core-dev.signingdesk.com/';
// const PDF_URL = 'data/85e39610-6532-4fd6-b245-ec8d22f6374e/67c47605-2c96-4a16-924d-7015ebee7937/5b751070-a102-4a84-922c-c0a10cb7cb75/sample.pdf';
const PDF_URL = 'data/85e39610-6532-4fd6-b245-ec8d22f6374e/65e45870-0c5f-4707-a58e-033ae403b2e7/dd0bac27-b39c-4556-a79e-5ead0eeb81f7/Smile More.pdf';
const RANDOM_PDF_URL = 'https://mapr.com/whitepapers/realizing-the-full-potential-of-your-cloud-investment/assets/MapR_WhitePaper_Cloud_3.pdf';
// const RANDOM_PDF_URL = 'PDF/Introduction to Zalando Townhouses.pdf';

class PDFViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdf: null,
            scale: 1
        };
    }

    componentDidMount() {
        PdfJs.getDocument(RANDOM_PDF_URL).then((pdf) => {
            console.log(pdf);
            this.setState({ pdf });
        }).catch(ex => {
            console.log("ERROR while fetching PDF:", ex);
        });
    }

    render() {
        const { pdf, scale } = this.state;
        return (
            <div className="pdf-context">
                <Viewer
                    pdf={pdf}
                    scale={scale}
                />
            </div>
        );
    }
}

export default PDFViewer;