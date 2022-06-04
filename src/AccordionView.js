import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, TouchableHighlight} from 'react-native';

import PropTpes from 'prop-types';

import Icon from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import propTypes from 'prop-types';

const AccordionView = props => {
  const {
    children,
    allowMultipleExpanded,
    preExpanded,
    allowZeroExpanded,
    onChange,
    style,
  } = props;

  const [activeSectionIndex, setActiveSectionIndex] = useState(
    allowZeroExpanded ? [] : preExpanded,
  );
  useEffect(() => {
    setActiveSectionIndex(allowZeroExpanded ? [] : preExpanded);
  }, [preExpanded]);

  const renderHeader = (sections, key, isExpanded) => {
    return (
      <View
        testID={`accordion-header-${key}`}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
        }}>
        <View style={{flex: 1, paddingRight: 20}}>{sections.title}</View>
        <Icon
          name={isExpanded ? 'remove-outline' : 'add-outline'}
          color="#fff"
          size={30}
        />
      </View>
    );
  };

  const renderContent = sections => {
    return <View style={{paddingBottom: 20}}>{sections.content}</View>;
  };

  const getParsedSections = () =>
    React.Children.toArray(children).reduce((AccordionArray, item) => {
      let title = item.props.children[0].props;
      let content = item.props.children[1].props;
      title = {...title.children, style: title.style};
      content = {...content.children, style: content.style};
      AccordionArray.push({
        title,
        content,
      });
      return AccordionArray;
    }, []);

  const handleActiveSections = index => {
    setActiveSectionIndex(index);
    onChange(index);
  };
  const sections = getParsedSections();

  return (
    <Accordion
      sections={sections}
      activeSections={activeSectionIndex}
      touchableComponent={TouchableOpacity}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={index => handleActiveSections(index)}
      expandMultiple={allowMultipleExpanded}
      renderAsFlatList
      containerStyle={[
        {marginHorizontal: 20, borderBottomColor: 'gray', borderBottomWidth: 1},
        style,
      ]}
    />
  );
};

AccordionView.Item = () => null;
AccordionView.Heading = () => null;
AccordionView.Description = () => null;

AccordionView.defaultProps = {
  allowMultipleExpanded: false,
  preExpanded: ['0'],
  allowZeroExpanded: false,
  onChange: () => {},
};
AccordionView.propTypes = {
  children: propTypes.node.isRequired,
  allowMultipleExpanded: PropTpes.bool,
  preExpanded: PropTpes.arrayOf(PropTpes.string),
  onChange: PropTpes.func,
  allowZeroExpanded: PropTpes.bool,
};

export default AccordionView;
