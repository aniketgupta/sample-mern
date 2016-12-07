  render() {
    return (
      <Grid>
        <Row>
          <h2 style={{ textAlign: 'center' }}>Sign In</h2>
          <hr/><Col md={3}/>
          <Col md={6}>
            <Well>
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Checkbox>Remember me</Checkbox>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">
                      Sign in
                    </Button>
                    &nbsp; or&nbsp;
                    <LinkContainer to="/signup">
                      <a>Sign up</a>
                    </LinkContainer>
                  </Col>
                </FormGroup>
              </Form>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}