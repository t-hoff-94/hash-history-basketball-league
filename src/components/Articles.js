import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar'
import { getTeamsArticles } from '../api'
import Article from './Article';
import Loading from './Loading';

export default class Articles extends Component {
  state = {
    loading: true,
    teamsArticles: [],
  }

  componentDidMount() {
    getTeamsArticles(this.props.match.params.teamId)
      .then((arts) => {
          this.setState(()=> ({
            loading: false,
            teamsArticles: arts.map(article => article.title)
          }))
      })
  }

  render() {
    const { loading, teamsArticles } = this.state;
    const { params, url } = this.props.match;
    const { teamId } = params;

    return loading === true
      ? <Loading />
      : <div className='container two-column'>
          <Sidebar
            loading={loading}
            title='Articles'
            list={teamsArticles}
            {...this.props}/>

          <Route path={`${url}/:articleId`} render={({match})=> (
            <Article articleId={match.params.articleId} teamId={teamId}>
              {(article)=> !article ? <Loading /> : (
                <div className='panel'>
                  <article className='article' key={article.id}>
                    <h1 className='header'>
                      <p>{article.body}</p>
                    </h1>
                  </article>
                </div>
              )}
            </Article>
            )} />
        </div>
  }
}
