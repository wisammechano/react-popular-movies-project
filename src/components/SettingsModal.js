import React from 'react';
import {
  Modal,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSettingsModal } from '../actions';
import { LANGUAGES, MOVIES_CATEGORIES } from '../constants';
import { changeLanguage, changeCategory } from '../actions';
import { find } from 'lodash';

const SettingsModal = (props) => {
  const show = useSelector((state) => state.home.showSettings);
  const currentLanguage = useSelector((state) => state.home.selectedLanguage);

  const currentDefaultCategory = useSelector(
    (state) => state.home.selectedCategory
  );

  const dispatch = useDispatch();

  const handleClose = () => dispatch(toggleSettingsModal(false));
  const onSelectLanguage = (selectedLanguage) =>
    dispatch(
      changeLanguage(find(LANGUAGES, (lang) => lang.code === selectedLanguage))
    );

  const onSelectCategory = (selectedCategory) =>
    dispatch(
      changeCategory(
        find(MOVIES_CATEGORIES, (cat) => cat.code === selectedCategory)
      )
    );

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Application Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col xs={4}>Language:</Col>
            <Col xs={6}>
              <DropdownButton
                size="sm"
                variant="secondary"
                title={currentLanguage.name}
                id="language-selector"
              >
                {Object.values(LANGUAGES).map((lang) => (
                  <Dropdown.Item
                    eventKey={lang.code}
                    onSelect={onSelectLanguage}
                    key={lang.code}
                  >
                    {lang.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}>Default Category:</Col>
            <Col xs={6}>
              <DropdownButton
                size="sm"
                variant="secondary"
                title={currentDefaultCategory.name_en}
                id="category-selector"
              >
                {Object.values(MOVIES_CATEGORIES).map((cat) => (
                  <Dropdown.Item
                    eventKey={cat.code}
                    onSelect={onSelectCategory}
                    key={cat.code}
                  >
                    {cat.name_en}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingsModal;
