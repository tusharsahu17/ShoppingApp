import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';

const WishListScreen = () => {
    const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);
  const ProductList = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => {
          if (wishlist.some(wishItem => wishItem.id === item.id)) {
            dispatch(removeFromWishlist(item));
            ToastAndroid.show(
              'Removing from Wishlist',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        }}>
        <Image source={{uri: item.image}} style={styles.img} />

        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.productPrice}>₹{item.price}</Text>
        </View>
        <Text>X</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductList item={item} />}
      />
    </View>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
});
