import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <span className="error-icon">⚠️</span>
          <h2 className="error-title">Algo salió mal</h2>
          <p className="error-body">Ocurrió un error inesperado en la aplicación.</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Recargar app
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
