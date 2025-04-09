import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToWishlist, removeFromWishlist} from '../redux/wishlistSlice';
import axios from 'axios';
import {addProduct} from '../redux/productSlice';

const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist);
    const productList = useSelector(state => state.products);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
  
  const getProduct = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      dispatch(addProduct(response.data));
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  const filteredProducts = productList.filter(item => {
    const matchAmount =
      selectedAmount === null ||
      (Array.isArray(selectedAmount)
        ? item.price >= selectedAmount[0] && item.price <= selectedAmount[1]
        : selectedAmount === 100
        ? item.price < 100
        : item.price > selectedAmount);

    const matchRating =
      selectedRating === null || (item.rating && item.rating.rate >= selectedRating);

    return matchAmount && matchRating;
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('WishListScreen')}
          style={{marginRight: 15}}>
          <Text style={styles.wishlistIcon}>❤️</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const ProductList = ({item}) => {
    return (
        <TouchableOpacity
        style={styles.productContainer}
        onPress={() => {
          navigation.navigate('ProductDetails', {product: item});
          console.log('Product clicked:', item);
        }}>
        <Image src={item.image} style={styles.img} />
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.amount}>₹{item.price}</Text>
        <Text numberOfLines={2} style={styles.desc}>
          {item.description}
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (wishlist.some(wishItem => wishItem.id === item.id)) {
              dispatch(removeFromWishlist(item));
              ToastAndroid.show(
                'Removed from Wishlist',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            } else {
              dispatch(addToWishlist(item));
              ToastAndroid.show(
                'Added to Wishlist',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
          }}>
          <Text style={styles.btnTitle}>Add To WishList</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
        <Text style={{alignSelf:'flex-end',fontSize:22}}>☰    </Text>
      </TouchableOpacity>
      <FlatList
        data={filteredProducts} 
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({item}) => <ProductList item={item} />}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Products</Text>

            <Text style={styles.filterLabel}>Price Range</Text>
            <TouchableOpacity onPress={() => setSelectedAmount(null)}>
              <Text
                style={
                  selectedAmount === null
                    ? styles.selectedOption
                    : styles.option
                }>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedAmount(100)}>
              <Text
                style={
                  selectedAmount === 100 ? styles.selectedOption : styles.option
                }>
                Below ₹100
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedAmount([100, 500])}>
              <Text
                style={
                  selectedAmount?.[0] === 100
                    ? styles.selectedOption
                    : styles.option
                }>
                ₹100 - ₹500
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedAmount(501)}>
              <Text
                style={
                  selectedAmount === 501 ? styles.selectedOption : styles.option
                }>
                Above ₹500
              </Text>
            </TouchableOpacity>

            <Text style={styles.filterLabel}>Rating</Text>
            <TouchableOpacity onPress={() => setSelectedRating(null)}>
              <Text
                style={
                  selectedRating === null
                    ? styles.selectedOption
                    : styles.option
                }>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedRating(4)}>
              <Text
                style={
                  selectedRating === 4 ? styles.selectedOption : styles.option
                }>
                4★ & above
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedRating(3)}>
              <Text
                style={
                  selectedRating === 3 ? styles.selectedOption : styles.option
                }>
                3★ & above
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => setFilterModalVisible(false)}>
                <Text style={styles.btnTitle}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  setSelectedAmount(null);
                  setSelectedRating(null);
                  setFilterModalVisible(false);
                }}>
                <Text style={styles.btnTitle}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  productContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: ' center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  img: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  wishlistIcon: {
    fontSize: 20,
    alignSelf: 'flex-end',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  desc: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 5,
  },
  btn: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  btnTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  filterBtn: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  filterBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  filterLabel: {
    fontWeight: '600',
    marginTop: 10,
  },
  option: {
    padding: 8,
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    padding: 8,
    fontSize: 16,
    color: 'orange',
    fontWeight: 'bold',
  },
  applyBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  clearBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  
});
