import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import articlesData from '../data/articles';

function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  
  useEffect(() => {
    // Rechercher l'article correspondant à l'ID
    const foundArticle = articlesData.find(a => a.id === id);
    setArticle(foundArticle);
  }, [id]);

  if (!article) {
    return (
      <div className="card">
        <h2 className="card-title">Article non trouvé</h2>
        <p>L'article que vous recherchez n'existe pas.</p>
        <Link 
          to="/ressources" 
          style={{
            marginTop: '16px',
            display: 'inline-block',
            color: '#805ad5'
          }}
        >
          Retour aux ressources
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="card" style={{marginBottom: '16px'}}>
        <Link 
          to="/ressources" 
          style={{
            marginBottom: '16px',
            display: 'inline-block',
            color: '#805ad5'
          }}
        >
          ← Retour aux ressources
        </Link>
        <div style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '16px'
        }}>
          <h2 className="card-title" style={{margin: 0}}>{article.title}</h2>
          <span style={{
            fontSize: '14px',
            padding: '4px 12px',
            backgroundColor: article.color,
            borderRadius: '16px',
            color: article.textColor,
            fontWeight: '500'
          }}>
            {article.category}
          </span>
        </div>
        <div style={{marginBottom: '24px'}}>
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title} 
              style={{
                width: '100%', 
                borderRadius: '8px', 
                marginBottom: '16px'
              }}
            />
          )}
          {article.content.map((paragraph, index) => (
            <p 
              key={index} 
              style={{
                marginBottom: '16px',
                lineHeight: '1.6'
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
        {article.related && article.related.length > 0 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>
              Articles liés
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {article.related.map((relatedId, index) => {
                const relatedArticle = articlesData.find(a => a.id === relatedId);
                return relatedArticle ? (
                  <Link 
                    key={index}
                    to={`/article/${relatedArticle.id}`}
                    style={{
                      color: '#805ad5',
                      textDecoration: 'none'
                    }}
                  >
                    {relatedArticle.title}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleView;