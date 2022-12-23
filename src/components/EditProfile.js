
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProfileMutation } from "../storeService/appApi";
import axios from "../axios";
import "../styles/Profile.css";

function EditProfile() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [age, setAge] = useState("");
    const [country, setCountry] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [updateProfile, { isError, error, isLoading, isSuccess }] = useUpdateProfileMutation();

    useEffect(() => {
        axios
            .get("/profiles/" + id)
            .then(({ data }) => {
                const profile = data.profile;
                setName(profile.name);
                setEmail(profile.email);
                setMobile(profile.mobile);
                setAge(profile.age);
                setCountry(profile.country);
                setImages(profile.pictures);
            })
            .catch((e) => console.log(e));
    }, [id]);

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !email || !mobile || !age || !country || !images.length) {
            return alert("Please fill out all the fields");
        }
        updateProfile({ id, name, email, mobile, age, country, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dlpwhg7qc",
                uploadPreset: "RentUrBook",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="new-profile__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Edit profile</h1>
                        {isSuccess && <Alert variant="success">profile updated</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>profile name</Form.Label>
                            <Form.Control type="text" placeholder="Enter profile name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>email</Form.Label>
                            <Form.Control as="textarea" placeholder="email" style={{ height: "100px" }} value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="number" placeholder="Mobile" value={mobile} required onChange={(e) => setMobile(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Age" value={age} required onChange={(e) => setAge(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>country</Form.Label>
                            <Form.Control type="text" placeholder="Enter country" value={country} required onChange={(e) => setCountry(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Upload Profile Image
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} alt="preview" />
                                        {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Update profile
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="new-profile__image--container"></Col>
            </Row>
        </Container>
    );
}

export default EditProfile;