import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import {
  Grid,
  Row,
  Col,
  Button,
  Well,
  Input, Form, FormGroup, FormControl, Checkbox, ControlLabel
} from 'react-bootstrap';;

import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { addVoteRequest, fetchTotalVotesKaranRequest, fetchTotalVotesArjunRequest  } from '../../VoteActions';
import { browserHistory } from 'react-router';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class TotalVotesPage extends Component {

  constructor(props) {
    super(props);
    this.addVoteKaran = this.addVoteKaran.bind(this);
    this.addVoteArjun = this.addVoteArjun.bind(this);
    this.getVoteKaran = this.getVoteKaran.bind(this);
    this.getVoteArjun = this.getVoteArjun.bind(this);
  }

  /*componentDidMount() {
    this.props.dispatch(fetchTotalVotesKaranRequest());
    this.props.dispatch(fetchTotalVotesArjunRequest());
  }*/

  componentWillReceiveProps(nextProps) {

    console.log("nextprops", nextProps);
    
    if(nextProps.error && nextProps.error.length > 0) {
      this.refs.container.error(`${nextProps.error} `, ``);
    } else if (nextProps.success && nextProps.success.length > 0) {
       this.refs.container.success(`${nextProps.success} `, ``);
    }
  }


  addVoteKaran(e) {
    e.preventDefault();
    const name = "karan"
    this.props.dispatch(addVoteRequest({name}));
  }

  addVoteArjun(e) {
    e.preventDefault();
    const name = 'arjun'
    this.props.dispatch(addVoteRequest({name}));
  }

  getVoteKaran(e) {
    e.preventDefault();
    this.props.dispatch(fetchTotalVotesKaranRequest());
  }

  getVoteArjun(e) {
    e.preventDefault();
    this.props.dispatch(fetchTotalVotesArjunRequest());
  }


  renderForm() {
    console.log("this porps", this.props)
    return (
      <Grid>
        <Row>
          <h2 style={{ textAlign: 'center' }}>Total Votes</h2>
          <hr/><Col md={3}/>
          <Col md={6}>
            <Well>
              <Form horizontal>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={4}>
                    Total Votes for karan
                  </Col>
                  <Col sm={8}>
                   <Button type="submit" onClick={this.getVoteKaran}>
                    Click
                  </Button>
                   {this.props.votesKaran}
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col componentClass={ControlLabel} sm={4}>
                    Total Votes for arjun
                  </Col>
                  <Col sm={8}>
                    <Button type="submit" onClick={this.getVoteArjun}>
                      Click
                    </Button>
                     {this.props.votesArjun}
                  </Col>
                </FormGroup>
                <FormGroup>
                  <LinkContainer to="/give_vote">
                    <a>Give vote</a>
                  </LinkContainer>
                </FormGroup>
              </Form>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
  render() {
    var objRenderForm = this.renderForm();
      return (
        <div>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="container"
            className="toast-top-right"
           />
          {objRenderForm}
        </div>
      );
  }
}



// Retrieve data from store as props
function mapStateToProps(state) {
  console.log("state:", state);
  return {
    votesKaran: state.vote.votesKaran,
    votesArjun: state.vote.votesArjun
  };
}

export default connect(mapStateToProps)(TotalVotesPage);
/*export default connect(mapStateToProps)(GiveVotePage);*/
