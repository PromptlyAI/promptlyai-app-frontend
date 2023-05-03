import React, { useEffect, useState, useContext } from 'react'
import './PromptTool.css'
import Api from '../../api/Api'
import Popup from '../Popup/popup'

import BookWhite from '../../images/BookWhite.png'
import TrashWhite from '../../images/TrashWhite.png'
import Edit from '../../images/Edit.png'
import PromptlyLogo from '../../images/PromptlyLogo.png'
import LoginCheck from '../../shared/LoginCheck/LoginCheck'
import TextPrompt from '../TextPrompt/TextPrompt'
import ImagePrompt from '../ImagePrompt/ImagePrompt'
import SettingsPage from '../../pages/SettingsPage/SettingsPage'
import { AppContext } from '../../context/AppContext'

interface TextPromptProps {
  answer: string
  input: string
  output: string
}
interface ImagePromptProps {
  input: string
  output: string
  url: string
}

export default function PromptTool() {
  const {
    promptId,
    setPromptId,
    needToSignIn,
    setNeedToSignIn,
    showSettings,
    setShowSettings,
    screenDimensions,
  } = useContext(AppContext)

  const [promptTitle, setPromptTitle] = useState<string>('')
  const [loadingPrompt, setLoadingPrompt] = useState<boolean>(false)
  const [] = useState<boolean>(false)
  const [showTextPrompt, setShowTextPrompt] = useState<boolean>(true)
  const [textPrompt, setTextPrompt] = useState<TextPromptProps>({
    answer: '',
    input: '',
    output: '',
  })
  const [imagePrompt, setImagePrompt] = useState<ImagePromptProps>({
    input: '',
    output: '',
    url: '',
  })

  useEffect(() => {
    setShowSettings(false)
    checkIfLoggedIn()
  }, [])

  useEffect(() => {
    if (promptId === 'newText') {
      setShowTextPrompt(true)
      setTextPrompt({
        answer: '',
        input: '',
        output: '',
      })
      createNewText()
    } else if (promptId === 'newImage') {
      setShowTextPrompt(false)
      setImagePrompt({
        input: '',
        output: '',
        url: '',
      })
      createNewImage()
    } else if (promptId !== undefined && promptId.length > 0) {
      loadPromptHistory()
    } else {
      setPromptTitle('new')
    }
  }, [promptId])

  function checkIfLoggedIn() {
    if (LoginCheck()) {
      setNeedToSignIn(true)
      console.log('need to sign in')
    } else {
      setNeedToSignIn(false)
      console.log('signed in')
    }
  }
  async function createNewText() {
    checkIfLoggedIn()

    setLoadingPrompt(true)
    setPromptId('')
    const response = await Api({
      path: `prompt?type=TEXT`,
      method: 'POST',
      token: localStorage.getItem('token') as string,
    })
    setPromptId(await response.prompt.id)
    setLoadingPrompt(false)
  }
  async function createNewImage() {
    checkIfLoggedIn()

    setPromptId('')
    const response = await Api({
      path: `prompt?type=IMAGE`,
      method: 'POST',
      token: localStorage.getItem('token') as string,
    })
    console.log(await response.prompt.id)
    setPromptId(await response.prompt.id)
  }
  async function loadPromptHistory() {
    checkIfLoggedIn()

    setTextPrompt({
      answer: '',
      input: '',
      output: '',
    })

    setImagePrompt({
      input: '',
      output: '',
      url: '',
    })

    setLoadingPrompt(true)
    const response = await Api({
      path: `prompt/get-prompt-info?promptId=${promptId}`,
      method: 'GET',
      token: localStorage.getItem('token') as string,
    })

    const type = await response.type
    if (type === 'TEXT') {
      setTextPrompt({
        answer: await response.answer,
        input: await response.input,
        output: await response.output,
      })
      setShowTextPrompt(true)
    } else if (type === 'IMAGE') {
      setImagePrompt({
        input: await response.input,
        output: await response.output,
        url: await response.answer,
      })
      setShowTextPrompt(false)
    }
    setPromptTitle(await response.input)
    setLoadingPrompt(false)
  }

  return (
    <div
      style={{
        overflowY: 'scroll',
        height: screenDimensions.h,
      }}
    >
      <div className="prompt-tool-top-container prompt-tool-top-container-height">
        <div className="hide-bar"></div>

        <div className="prompt-title-container">
          <img
            style={{ width: '47.2px', height: '38.4px' }}
            src={BookWhite}
            alt=""
          />
          <div className="title-container" style={{ width: '500px' }}>
            {loadingPrompt ? (
              <div className="center">
                <div className="loader"></div>
              </div>
            ) : (
              <div className="center">
                <h1>
                  {promptTitle
                    ? promptTitle.length > 31
                      ? `${promptTitle.slice(0, 31)}...`
                      : promptTitle
                    : 'new'}
                </h1>
              </div>
            )}
          </div>
          <div
            style={{
              width: '110px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <img style={{ width: '38px', height: '38px' }} src={Edit} alt="" />
            <img
              style={{ width: '51px', height: '48px' }}
              src={TrashWhite}
              alt=""
            />
          </div>
        </div>
        <div className="logo-container">
          <a
            className="login-button"
            href="https://www.promptlylabs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={PromptlyLogo} className="mobileLogo" alt="" />
          </a>
        </div>

        {/* {screenDimensions.w > 1836 && (
          
        )} */}
      </div>
      <div style={{}} className="prompt-tool-container">
        {showSettings && <SettingsPage />}
        {needToSignIn && <Popup />}

        {promptId && (
          <>
            {/* {!loadingPrompt && ( */}
            <>
              {showTextPrompt ? (
                <TextPrompt
                  textPrompt={textPrompt}
                  setTextPrompt={setTextPrompt}
                  setPromptTitle={setPromptTitle}
                />
              ) : (
                <ImagePrompt
                  imagePrompt={imagePrompt}
                  setImagePrompt={setImagePrompt}
                  setPromptTitle={setPromptTitle}
                />
              )}
            </>
            {/* )} */}
          </>
        )}
      </div>
    </div>
  )
}
