/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import ProductDetails from './productDetails.json';
import AccordionView from './src/AccordionView';
import {SliderBox} from 'react-native-image-slider-box';
import RadioGroup from 'react-native-radio-buttons-group';

const radioButtonsData = [
  {
    id: '1',
    label: 'Mens',
    value: 'Mens',
  },
  {
    id: '2',
    label: 'Womens',
    value: 'Womens',
  },
  {
    id: '3',
    label: 'Youth',
    value: 'Youth',
  },
];

const moreDetails = ProductDetails.moredetails;
const frequentlyAskedQuestions = ProductDetails.frequentlyAskedQuestions;
const recommendedProducts = ProductDetails.recommendedProducts;
const blitzDetails = ProductDetails.blitz;
const imageUrls = ProductDetails.details.imageUrls;
const details = ProductDetails.details;

const BlitzText = ({containerStyle}) => {
  return (
    <View
      style={[
        {
          borderColor: 'white',
          borderWidth: 2,
          paddingHorizontal: 10,
          paddingVertical: 1,
          marginRight: 100,
        },
        containerStyle,
      ]}>
      <Text style={styles.title}>BLITZ</Text>
    </View>
  );
};

const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}>
      <BlitzText />
      <View
        style={{flexDirection: 'row', flex: 1, justifyContent: 'space-around'}}>
        <Icon name="md-search" color="#ccc" size={25} />
        <Icon name="cart" color="#ccc" size={25} iconStyle={{marginLeft: 30}} />
        <Icon name="menu" color="#ccc" size={25} iconStyle={{marginLeft: 30}} />
      </View>
    </View>
  );
};

const ProductPath = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingRight: 30,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
        height: 30,
      }}>
      <Text style={styles.pathText}>Home</Text>
      <Icon name="chevron-forward-outline" color="#383838" size={25} />
      <Text style={styles.pathText}>Shoes</Text>
      <Icon name="chevron-forward-outline" color="#383838" size={25} />
      <Text style={styles.pathText}>Air Jordan</Text>
      <Icon name="chevron-forward-outline" color="#383838" size={25} />
      <Text style={styles.activeText}>Air Jordan...</Text>
      <View
        style={{
          width: 6,
          height: 6,
          backgroundColor: '#00ffff',
          borderRadius: 3,
          position: 'absolute',
          right: 15,
        }}></View>
    </View>
  );
};

const SliderImageInfo = ({imageNo}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          backgroundColor: '#383838',
          paddingHorizontal: 10,
          paddingVertical: 2,
        }}>
        <Text style={styles.activeText}>
          {imageNo + '/' + imageUrls.length}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            backgroundColor: '#383838',
            paddingHorizontal: 10,
            paddingVertical: 2,
          }}>
          <Text style={styles.activeText}>#12 of 20</Text>
        </View>
        <View
          style={{
            backgroundColor: '#00ffff',
            paddingHorizontal: 10,
            paddingVertical: 2,
          }}>
          <Text style={[styles.activeText, {color: 'black'}]}>NEW</Text>
        </View>
      </View>
    </View>
  );
};

const ProductMoreInfo = () => {
  return moreDetails.map((item, key) => (
    <AccordionView
      key={key}
      style={item.title == 'Shipping & Returns' ? {borderBottomWidth: 0} : {}}>
      <AccordionView.Item>
        <AccordionView.Heading>
          <Text style={styles.AccordionTitle}>{item.title}</Text>
        </AccordionView.Heading>
        <AccordionView.Description>
          <Text style={styles.AccordionDescription}>{item.description}</Text>
        </AccordionView.Description>
      </AccordionView.Item>
    </AccordionView>
  ));
};

const getProductInfo = (key, value) => {
  return (
    <View style={{flexWrap: 'wrap'}}>
      <View style={styles.textBox}>
        <Text style={styles.activeText}>{key}</Text>
        <Text style={styles.pathText}>{value}</Text>
      </View>
    </View>
  );
};

const ProductDetailsInfo = () => {
  return (
    <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
      <Text style={{color: '#ff1493', fontSize: 18, letterSpacing: 0.5}}>
        {ProductDetails.title}
      </Text>
      <View style={{paddingVertical: 2}} />
      <Text style={styles.headingText}>{ProductDetails.name}</Text>
      <View style={{paddingVertical: 2}} />
      <Text style={styles.AccordionTitle}>
        {details.cost + ' | ' + details.type}
      </Text>
      <View style={{marginVertical: 5, paddingTop: 5, flexDirection: 'row'}}>
        {getProductInfo('Style Code: ', details.styleCode)}
        <View style={{padding: 2}} />
        {getProductInfo('Year: ', details.year)}
      </View>
      {getProductInfo('Colorway: ', details.colorWay)}
    </View>
  );
};

const ButtonTextWithIcon = ({buttonText, style, containerStyle, textStyle}) => {
  return (
    <TouchableOpacity style={[{flexWrap: 'wrap'}, style]}>
      <View
        style={[
          {
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 20,
          },
          containerStyle,
        ]}>
        <Text style={[styles.AccordionTitle, {paddingRight: 20}, textStyle]}>
          {buttonText}
        </Text>
        <Icon name="arrow-forward-outline" color="#ccc" size={25} />
      </View>
    </TouchableOpacity>
  );
};

const TextWithIcon = ({iconName, text}) => {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
      <Icon name={iconName} color="#ccc" size={32} />
      <Text style={[styles.AccordionTitle, {paddingLeft: 10}]}>{text}</Text>
    </View>
  );
};

const InfoSection = () => {
  return (
    <>
      <View style={styles.horizontalLine} />
      <View style={{marginHorizontal: 20}}>
        <Text style={styles.title}>INFO</Text>
        <TextWithIcon
          iconName="shield-checkmark-outline"
          text="AUTHENTICITY GUARANTEED"
        />
        <TextWithIcon iconName="bus-outline" text="IN STOCK & READY TO SHIP" />
      </View>
      <View style={styles.horizontalLine} />
    </>
  );
};

const PairsWellWithSection = () => {
  return (
    <>
      <View style={{marginHorizontal: 20, marginBottom: 10}}>
        <Text style={[styles.title, {marginVertical: 10}]}>
          PAIRS WELL WITH
        </Text>
        <ButtonTextWithIcon buttonText={'SEE MORE'} />
      </View>
      <View style={styles.horizontalLine} />
    </>
  );
};

const ConditionDetails = () => {
  return (
    <View style={{marginHorizontal: 20, marginBottom: 10}}>
      <View style={styles.horizontalLine} />
      <View
        style={{flexDirection: 'row', marginBottom: 15, alignItems: 'center'}}>
        <Text style={styles.AccordionTitle}>Condition: </Text>
        <View
          style={{
            backgroundColor: '#00ffff',
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 12,
            marginLeft: 5,
          }}>
          <Text style={[styles.activeText, {fontSize: 18, color: 'black'}]}>
            Mint
          </Text>
        </View>
      </View>
      <Text style={styles.AccordionDescription}>{details.condition}</Text>
      <View style={{marginVertical: 10}}>
        <Text style={styles.AccordionTitle}>
          Wonna save some money? Check out our used section.
        </Text>
      </View>
      <ButtonTextWithIcon buttonText="SEE USED" />
    </View>
  );
};

const FAQSection = () => {
  return (
    <>
      <View style={styles.horizontalLine} />
      <Text style={[styles.title, {marginHorizontal: 20, marginTop: 10}]}>
        FREQUENTLY ASKED QUESTIONS
      </Text>
      {frequentlyAskedQuestions.map((item, key) => (
        <AccordionView
          key={key}
          style={
            item.title == 'Lorem ipsum question number 5?'
              ? {borderBottomWidth: 0}
              : {}
          }>
          <AccordionView.Item>
            <AccordionView.Heading>
              <Text style={styles.AccordionTitle}>{item.title}</Text>
            </AccordionView.Heading>
            <AccordionView.Description>
              <Text style={styles.AccordionDescription}>
                {item.description}
              </Text>
            </AccordionView.Description>
          </AccordionView.Item>
        </AccordionView>
      ))}
      <View style={styles.horizontalLine} />
    </>
  );
};

const RecommendedProductsSection = () => {
  return (
    <>
      <View style={{marginHorizontal: 20, marginBottom: 10}}>
        <Text style={[styles.title, {marginVertical: 10}]}>
          RECOMENDED PRODUCTS
        </Text>
        <ButtonTextWithIcon buttonText={'SEE MORE'} />
      </View>
      <View style={styles.horizontalLine} />
    </>
  );
};

const ItemSeparatorLine = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: 'gray',
      }}
    />
  );
};

const RPList = () => {
  return (
    <FlatList
      data={recommendedProducts}
      ItemSeparatorComponent={ItemSeparatorLine}
      renderItem={({item}) => (
        <View style={{paddingHorizontal: 10, flex: 1, marginBottom: 15}}>
          <Image
            source={{
              uri: 'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5796.png?i=1',
            }}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'contain',
            }}
          />
          <Text style={styles.AccordionTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.activeText, {margin: 5}]}>{item.cost}</Text>
          <ButtonTextWithIcon
            style={{marginVertical: 5}}
            buttonText={'SHOP NOW'}
          />
        </View>
      )}
      numColumns={2}
      keyExtractor={(item, index) => index}
    />
  );
};

const BlitzSection = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#1f1f1f',
          paddingVertical: 30,
        }}>
        <View style={{flexWrap: 'wrap', alignSelf: 'center', marginBottom: 10}}>
          <BlitzText containerStyle={{marginRight: 0}} />
        </View>
        {blitzDetails.map((item, key) => (
          <AccordionView
            key={key}
            style={[
              blitzDetails.length ? {borderBottomWidth: 0} : {},
              {backgroundColor: 'transparent'},
            ]}>
            <AccordionView.Item>
              <AccordionView.Heading>
                <Text style={styles.AccordionTitle}>{item.title}</Text>
              </AccordionView.Heading>
              <AccordionView.Description>
                <Text style={styles.AccordionDescription}>
                  {item.description}
                </Text>
              </AccordionView.Description>
            </AccordionView.Item>
          </AccordionView>
        ))}
      </View>
      <View style={[styles.horizontalLine, {marginVertical: 0}]} />
    </>
  );
};

const PoweredBySection = () => {
  return (
    <>
      <View
        style={{alignItems: 'center', backgroundColor: '#1f1f1f', padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: 120,
          }}>
          <Icon name="logo-facebook" color="gray" size={30} />
          <Icon name="logo-instagram" color="gray" size={30} />
          <Icon name="logo-twitter" color="gray" size={30} />
        </View>
        <Text
          style={[
            styles.pathText,
            {fontSize: 20, fontWeight: '400', marginVertical: 10},
          ]}>
          POWERED BY{' '}
          <Text style={[styles.pathText, {fontSize: 20, fontWeight: '900'}]}>
            PROTON
          </Text>
        </Text>
        <Text style={[styles.pathText, {marginVertical: 10}]}>
          @ 2022 Blitz Project. All rights reserved.
        </Text>
      </View>
      <View style={[styles.horizontalLine, {marginVertical: 0, zIndex: 1}]} />
    </>
  );
};

const App = () => {
  const [imageNo, setImageNo] = useState(1);
  const [text, onChangeText] = React.useState(null);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  const SignUpSection = () => {
    return (
      <>
        <View style={[styles.horizontalLine, {marginVertical: 0}]} />
        <View
          style={{
            flex: 1,
            backgroundColor: '#1f1f1f',
            paddingHorizontal: 20,
            paddingVertical: 30,
          }}>
          <Text
            style={[
              styles.title,
              {
                letterSpacing: 1,
                fontSize: 30,
                textAlign: 'center',
                marginBottom: 5,
              },
            ]}>
            Sign Up For The Newsletter.
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Your email here.."
            placeholderTextColor="gray"
          />
          <ButtonTextWithIcon
            buttonText={'SUBSCRIBE'}
            style={{flexWrap: 'nowrap', marginVertical: 10}}
            containerStyle={{
              justifyContent: 'space-between',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            textStyle={{textAlign: 'center', flex: 1}}
          />
        </View>
        <View style={[styles.horizontalLine, {marginVertical: 0}]} />
      </>
    );
  };

  const onPressRadioButton = radioButtonsArray => {
    setRadioButtons(radioButtonsArray);
  };

  const AddToBagSection = () => {
    return (
      <View style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'space-between',
          }}>
          <View style={[styles.textBox, {borderWidth: 0}]}>
            <Text style={styles.activeText}>Size: </Text>
            <Text style={styles.pathText}>Fit True to Size</Text>
          </View>
          <Text style={[styles.activeText, {textDecorationLine: 'underline'}]}>
            Size Guide
          </Text>
        </View>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
          layout="row"
        />
        <View
          style={{
            borderColor: 'white',
            alignItems: 'center',
            borderWidth: 1,
            marginVertical: 10,
            flexDirection: 'row',
            paddingRight: 10,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={[
              styles.activeText,
              {padding: 5, textAlign: 'center', flex: 1},
            ]}>
            10.0 US
          </Text>
          <Text
            style={[
              styles.activeText,
              {fontSize: 20, textAlign: 'center', paddingHorizontal: 10},
            ]}>
            |
          </Text>
          <Icon name="chevron-down-outline" color="#fff" size={25} />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 25,
            padding: 10,
            marginVertical: 10,
          }}>
          <Text
            style={[
              styles.AccordionTitle,
              {
                flex: 1,
                textAlign: 'center',
                fontWeight: '600',
                color: 'black',
                letterSpacing: 0.8,
              },
            ]}>
            ADD TO BAG | $702
          </Text>
          <Icon name="arrow-forward-outline" color="#000" size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <Header />
        <ProductPath />
        <SliderImageInfo imageNo={imageNo} />
        <SliderBox
          images={imageUrls}
          sliderBoxHeight={250}
          resizeMode={'stretch'}
          currentImageEmitter={index => setImageNo(index + 1)}
        />
        <ProductDetailsInfo />
        <ConditionDetails />
        <InfoSection />
        <ProductMoreInfo />
        <FAQSection />
        <PairsWellWithSection />
        <RecommendedProductsSection />
        <RPList />
        <SignUpSection />
        <BlitzSection />
        <PoweredBySection />
        <AddToBagSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'black',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 0.5,
  },
  pathText: {
    fontSize: 16,
    color: 'gray',
    letterSpacing: 0.2,
  },
  activeText: {
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.2,
  },
  AccordionTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  AccordionDescription: {
    fontSize: 16,
    letterSpacing: 0.8,
    color: 'gray',
  },
  headingText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  textBox: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 15,
  },
  input: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: 'black',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default App;
