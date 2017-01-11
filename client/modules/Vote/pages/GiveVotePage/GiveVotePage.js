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
import { addVoteRequest } from '../../VoteActions';
import { browserHistory } from 'react-router';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class GiveVotePage extends Component {

  constructor(props) {
    super(props);
    this.addVoteKaran = this.addVoteKaran.bind(this);
    this.addVoteArjun = this.addVoteArjun.bind(this);
  }

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


  renderForm() {
    return (
      <Grid>
        <Row>
          <h2 style={{ textAlign: 'center' }}>Vote</h2>
          <hr/><Col md={3}/>
          <Col md={6}>
            <Well>
              <Form horizontal>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={4}>
                    Vote for karan
                  </Col>
                  <Col sm={8}>
                    <Button type="submit" onClick={this.addVoteKaran}>
                      Vote
                    </Button>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col componentClass={ControlLabel} sm={4}>
                    Vote for arjun
                  </Col>
                  <Col sm={8}>
                    <Button type="submit" onClick={this.addVoteArjun}>
                      Vote
                    </Button>
                  </Col>
                </FormGroup>
                <FormGroup>

                      <LinkContainer to="/total_votes">
                        <a>Total votes</a>
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
  console.log("state:", state.vote);
  return {
    status : state.vote.status,
    isGivenVote : state.vote.isGivenVote,
    isGivenVoteFailed : state.vote.isGivenVoteFailed,
    success : state.vote.success,
    
  };
}

export default connect(mapStateToProps)(GiveVotePage);



