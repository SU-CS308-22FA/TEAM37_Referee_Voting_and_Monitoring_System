import React from 'react';
import Form from 'react-bootstrap/Form';
const SelectWeek = ({handleWeek}) => {
    return (
        <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Week</Form.Label>
        <Form.Select name='week' aria-label="Default select example" required defaultValue={'choose here'} onChange={(e)=>handleWeek(e.target.value)}>
      {/* <option>Choose here</option> */}
      <option value="week1">week 1</option>
      <option value="week2">week 2</option>
      <option value="week3">week 3</option>
      <option value="week4">week 4</option>
      <option value="week5">week 5</option>
      <option value="week6">week 6</option>
      <option value="week7">week 7</option>
      <option value="week8">week 8</option>
      <option value="week9">week 9</option>
      <option value="week11">week 11</option>
      <option value="week12">week 12</option>
      <option value="week13">week 13</option>
      <option value="week14">week 14</option>
      <option value="week15">week 15</option>
      <option value="week16">week 16</option>
      <option value="week17">week 17</option>
      <option value="week18">week 18</option>
      <option value="week19">week 19</option>
      <option value="week20">week 20</option>
      <option value="week21">week 21</option>
      <option value="week22">week 22</option>
      <option value="week23">week 23</option>
      <option value="week24">week 24</option>
      <option value="week25">week 25</option>
      <option value="week26">week 26</option>
      <option value="week27">week 27</option>
      <option value="week28">week 28</option>
      <option value="week29">week 29</option>
      <option value="week30">week 30</option>
      <option value="week31">week 31</option>
      <option value="week32">week 32</option>
      <option value="week33">week 33</option>
      <option value="week34">week 34</option>
      <option value="week35">week 35</option>
      <option value="week36">week 36</option>
      <option value="week37">week 37</option>
      <option value="week38">week 38</option>
    </Form.Select>
      </Form.Group>
        </>
    );
};

export default SelectWeek;