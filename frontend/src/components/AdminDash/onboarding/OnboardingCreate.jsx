// import React, { Component, Fragment,useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Icon } from 'components/Shared';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import StepWizard from 'react-step-wizard';
// import transitions from './transitions.css';
// import Nav from './nav';
// import Plugs from './Plugs';
// import wizardstyles from './wizard.less';
// import Onboarding1 from './Onboarding1'
// import Onboarding2 from './Onboarding2'
// import Onboarding3 from './Onboarding3'
// import Onboarding4 from './Onboarding4'
// import onboarding1 from "../../../images/onboarding_1.svg";
//
//
// const Styled = {
//     Container: styled.div`
//     width: 100%;
//     height: 100%;
//     background: ${props => props.theme.grey9};
//     padding-top: 1rem;
//     display: flex;
//     flex-direction: row;
//     align-items: space-between;
//   `,
//     ContainerTest: styled.div`
//     display: flex;
//     align-items: space-between;
//     flex-direction: column;
//     margin-left: 8rem;
//   `,
//     ImgContainer: styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   `,
//     HeaderContainer: styled.div`
//     width: 95%;
//     max-width: 80rem;
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 1rem;
//   `,
//     Button: styled(Button)`
//     border: none;
//   `,
//     ButtonContainer: styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center
//     flex-direction: row
//   `
// };
//
// export default class OnboardingCreate extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             form: {},
//             transitions: {
//                 enterRight: `${transitions.animated} ${transitions.enterRight}`,
//                 enterLeft: `${transitions.animated} ${transitions.enterLeft}`,
//                 exitRight: `${transitions.animated} ${transitions.exitRight}`,
//                 exitLeft: `${transitions.animated} ${transitions.exitLeft}`,
//                 intro: `${transitions.animated} ${transitions.intro}`,
//             },
//             // demo: true, // uncomment to see more
//         };
//     }
//
//     updateForm = (key, value) => {
//         const { form } = this.state;
//
//         form[key] = value;
//         this.setState({ form });
//     }
//
//     setInstance = SW => this.setState({ SW })
//
//     render() {
//         // const { SW, demo } = this.state;
//
//         return (
//             <Styled.Container>
//             <div className='container'>
//                 <StepWizard
//                     onStepChange={this.onStepChange}
//                     isHashEnabled
//                     nav={<Nav />}
//                     instance={this.setInstance}
//                 >
//                     <Onboarding1 hashKey={'FirstStep'} update={this.updateForm} />
//                     <Onboarding2 hashKey={'SecondStep'} update={this.updateForm} />
//                     <Onboarding3 hashKey={'ThirdStep'} update={this.updateForm} />
//                     <Onboarding4 hashKey={'FourthStep'} update={this.updateForm} />
//                     <Second form={this.state.form} />
//                     <Last hashKey={'TheEnd!'} />
//                 </StepWizard>
//                 {/*{ (demo && SW) && <InstanceDemo SW={SW} /> }*/}
//             </div>
//             </Styled.Container>
//         );
//     }
// }
//
// /** Demo of using instance */
// const InstanceDemo = ({ SW }) => (
//     <Fragment>
//         <h4>Control from outside component</h4>
//         <button className={'btn btn-secondary'} onClick={SW.previousStep}>Previous Step</button>
//         &nbsp;
//         <button className={'btn btn-secondary'} onClick={SW.nextStep}>Next Step</button>
//     </Fragment>
// );
//
// /**
//  * Stats Component - to illustrate the possible functions
//  * Could be used for nav buttons or overview
//  */
// export const Stats = ({
//                    currentStep,
//                    firstStep,
//                    goToStep,
//                    lastStep,
//                    nextStep,
//                    previousStep,
//                    totalSteps,
//                    step,
//                }) => (
//     <div>
//         <hr />
//         { step > 1 &&
//
//         <button onClick={previousStep}>
//             Back
//         </button>
//         }
//         { step < totalSteps ?
//             <button onClick={nextStep}> Next </button>
//             :
//             <button onClick={nextStep}> Finish </button>
//         }
//         <hr />
//         {/*<div style={{ fontSize: '21px', fontWeight: '200' }}>*/}
//             {/*<h4>Other Functions</h4>*/}
//             {/*<div>Current Step: {currentStep}</div>*/}
//             {/*<div>Total Steps: {totalSteps}</div>*/}
//             {/*<button className='btn btn-block btn-default' onClick={firstStep}>First Step</button>*/}
//             {/*<button className='btn btn-block btn-default' onClick={lastStep}>Last Step</button>*/}
//             {/*<button className='btn btn-block btn-default' onClick={() => goToStep(2)}>Go to Step 2</button>*/}
//         {/*</div>*/}
//     </div>
// );
// /** Steps */
//
// class First extends Component {
//     update = (e) => {
//         this.props.update(e.target.name, e.target.value);
//     }
//
//     render() {
//         return (
//             <div>
//                 <h2 className='text-center'>Hi, Let's get your account set up.</h2>
//                 <h5 className='text-left'>Account Information</h5>
//                 <label>Email</label>
//                 <input type='text' className='form-control' name='email' placeholder='Email'
//                        onChange={this.update} />
//                 <Stats step={1} {...this.props} />
//             </div>
//         );
//     }
// }
//
// class Second extends Component {
//     validate = () => {
//         if (confirm('Are you sure you want to go back?')) { // eslint-disable-line
//             this.props.previousStep();
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 { this.props.form.email && <h3>Hey {this.props.form.email}! 👋</h3> }
//                 <h2 className='text-center'>Hi, Let's set up your organization.</h2>
//                 <h5 className='text-left'>Organization Information</h5>
//                 <input type='text' className='form-control' name='company' placeholder='Company Name'
//                        onChange={this.update} />
//                 <Stats step={2} {...this.props} previousStep={this.validate} />
//             </div>
//         );
//     }
// }
//
//
// class Last extends Component {
//     submit = () => {
//         alert('You did it! Yay!') // eslint-disable-line
//     };
//
//     render() {
//         return (
//             <div>
//                 <div className={'text-center'}>
//                     {/*<h3>This is the last step in this example!</h3>*/}
//                     {/*<hr />*/}
//                     {/*<Plugs />*/}
//                     <h2 className='text-center'>Let's add some volunteers.</h2>
//                     <h5 className='text-left'>Upload CSV or Spreadsheet</h5>
//                     <input type="file" name='csvfile'/>
//                 </div>
//                 <Stats step={4} {...this.props} nextStep={this.submit} />
//             </div>
//         );
//     }
// }
