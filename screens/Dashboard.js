import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  RefreshControl,
  Alert,
  ActivityIndicator,
  FlatList,
  LogBox,
} from 'react-native';
import axios from 'axios';
import {url} from '../vars';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setArticles, setFilteredArticles} from '../actions/articles';

import handleErrors from '../helpers/handleErrors';

const Dashboard = props => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [reload, setReload] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [search, setSearch] = useState('');
  const getArticles = () => {
    setIsLoading(true);
    axios
      .get(`${url}/articles`, {
        headers: {
          Authorization: 'Bearer ' + props.auth.accessToken,
        },
        params: {
          page: currentPage,
        },
      })
      .then(function (response) {
        if (response.data.response.docs.length > 0) {
          if (refreshing) {
            setArticles(response.data.response.docs);
          } else {
            let temp = articles;
            const addedPosts = temp.concat(response.data.response.docs);
            setArticles(addedPosts);
          }
          setRefreshing(false);
        } else {
          setRefreshing(false);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        setRefreshing(false);
        handleErrors(error);
      });
  };

  useEffect(() => {
    if (currentPage === 0) {
      setArticles([]);
    }
    getArticles();
  }, [currentPage, reload]);

  const renderPost = ({item, index}) => {
    const article = item;

    return (
      <View key={index}>
        <Text style={styles.article}>{article.headline.main}</Text>
        <Text style={styles.abstract}>{article.abstract}</Text>
      </View>
    );
  };

  const handleSearch = text => {
    setSearchLoading(true);

    const filtered = articles.filter(
      article =>
        article.headline.main.toUpperCase().includes(text.toUpperCase()) ||
        article.abstract.toUpperCase().includes(text.toUpperCase()),
    );
    setFilteredArticles(filtered);

    setSearch(text);

    setSearchLoading(false);
  };
  useEffect(() => {
    setFilteredArticles(articles);
    handleSearch(search);
  }, [articles]);

  useEffect(() => {
    props.setArticles(articles);
  }, [articles]);

  useEffect(() => {
    props.setFilteredArticles(filteredArticles);
  }, [filteredArticles]);

  return (
    <>
      <View style={styles.section}>
        <TextInput
          placeholder="Search Articles"
          placeholderTextColor="#666666"
          style={[
            styles.textInput,
            {
              color: '#000',
            },
          ]}
          autoCapitalize="none"
          onChangeText={val => handleSearch(val)}
        />
      </View>
      {searchLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={styles.container}
          ListHeaderComponent={() => {
            return null;
          }}
          data={filteredArticles}
          renderItem={renderPost}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.3}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd < 0 || isLoading || search != '') return;
            setCurrentPage(currentPage + 1);
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                if (currentPage === 0) {
                  setReload(!reload);
                }
                setCurrentPage(0);
              }}
            />
          }
          ListFooterComponent={() => {
            if (isLoading) {
              return <ActivityIndicator size="large" />;
            }
            return null;
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setArticles,
      setFilteredArticles,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginLeft: 0,
    marginRight: 0,
  },

  title: {
    color: '#05375a',
    fontSize: 18,
  },

  article: {
    color: '#05375a',
    fontSize: 18,
    marginLeft: 10,
  },

  abstract: {
    color: '#05375a',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 10,
  },

  paragraph: {
    color: '#05375a',
    fontSize: 12,
    marginBottom: 30,
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingLeft: 10,
    color: '#05375a',
  },
  section: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginLeft: 10,
  },
});
