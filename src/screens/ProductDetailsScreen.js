import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ProductDetailsScreen = ({route}) => {
  const {product} = route.params;

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{padding: 20, flexGrow: 1}}>
        <Image source={{uri: product.image}} style={styles.img} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.amt}>₹{product.price}</Text>
        <View style={styles.row}>
          <Text style={[styles.ratings,{color:'green'}]}>{product?.rating.rate}</Text>
          <Text>*</Text>
          <Text  style={[styles.ratings,{color:'blue'}]}>{product?.rating.count} ratings</Text>
        </View>
        {console.log('Product:', product)}
        <Text style={styles.ratings}>Product Details:</Text>
        <Text style={{fontSize: 16}}>{product.description}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnTitle}>Add To WishList</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetailsScreen;
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  amt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  img: {
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
  btnTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:5,
  },
  ratings:{
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    marginBottom: 10,
  }
});
