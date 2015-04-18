//------------------------------------------------------------------------------
// <copyright file="MainWindow.xaml.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------

namespace Microsoft.Samples.Kinect.SkeletonBasics
{
    using System.IO;
    using System.Windows;
    using System.Windows.Media;
    using Microsoft.Kinect;
    using System.Diagnostics;

    /// Interaction logic for MainWindow.xaml
    public partial class MainWindow : Window
    {
        private bool isReset = true;

        //Websocket
        private WebSocket ws = new WebSocket();

        /// Active Kinect sensor
        private KinectSensor sensor;

        /// Initializes a new instance of the MainWindow class.
        public MainWindow()
        {
            InitializeComponent();
        }


        /// Execute startup tasks
        private void WindowLoaded(object sender, RoutedEventArgs e)
        {
            Debug.WriteLine("hello world");

            //Establish websocket server            
            ws.InitializeSockets();

            // Look through all sensors and start the first connected one.
            // This requires that a Kinect is connected at the time of app startup.
            // To make your app robust against plug/unplug, 
            // it is recommended to use KinectSensorChooser provided in Microsoft.Kinect.Toolkit (See components in Toolkit Browser).
            foreach (var potentialSensor in KinectSensor.KinectSensors)
            {
                if (potentialSensor.Status == KinectStatus.Connected)
                {
                    this.sensor = potentialSensor;
                    break;
                }
            }

            if (null != this.sensor)
            {
                // Turn on the skeleton stream to receive skeleton frames
                this.sensor.SkeletonStream.Enable();

                // Add an event handler to be called whenever there is new color frame data
                this.sensor.SkeletonFrameReady += this.SensorSkeletonFrameReady;

                // Start the sensor!
                try
                {
                    this.sensor.Start();
                }
                catch (IOException)
                {
                    this.sensor = null;
                }
            }

            if (null == this.sensor)
            {
                this.statusBarText.Text = Properties.Resources.NoKinectReady;
            }
        }

        /// Execute shutdown tasks
        private void WindowClosing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (null != this.sensor)
            {
                this.sensor.Stop();
            }
        }

        /// Event handler for Kinect sensor's SkeletonFrameReady event
        private void SensorSkeletonFrameReady(object sender, SkeletonFrameReadyEventArgs e)
        {
            Skeleton[] skeletons = new Skeleton[0];
            bool isPerson = false;

            using (SkeletonFrame skeletonFrame = e.OpenSkeletonFrame())
            {
                if (skeletonFrame != null)
                {
                    skeletons = new Skeleton[skeletonFrame.SkeletonArrayLength];
                    skeletonFrame.CopySkeletonDataTo(skeletons);
                }

                //temp
                //Debug.WriteLine(skeletons.Length);

                if (skeletons.Length > 0)
                {  
                    foreach (Skeleton skel in skeletons)
                    {
                        if (skel.TrackingState == SkeletonTrackingState.Tracked)
                        {
                            isPerson = true;
                        }
                    }
                }

                if (isPerson)
                {
                    SkelStatusText.Text = "Detected";
                    jointTracker(skeletons);
                }
                else
                {
                    SkelStatusText.Text = "Not Detected";
                }

            }

        }

        private void jointTracker(Skeleton[] skeletons)
        {
            //Begin Joint Tracking
            for (var i = 0; i < skeletons.Length; ++i)
            {
                Joint rightHand = skeletons[i].Joints[JointType.HandRight];
                Joint leftHand = skeletons[i].Joints[JointType.HandLeft];
                Joint head = skeletons[i].Joints[JointType.Head];

                //Rotate
                if (rightHand.Position.Y > head.Position.Y && leftHand.Position.Y > head.Position.Y
                    && this.isReset)
                {
                    Debug.WriteLine("rotate");
                    ws.sendMsg("rotate");
                    this.isReset = false;
                }

                //Right
                else if (rightHand.Position.Y > head.Position.Y && this.isReset)
                {
                    Debug.WriteLine("right");
                    ws.sendMsg("right");
                    this.isReset = false;
                }

                //Left
                else if (leftHand.Position.Y > head.Position.Y && this.isReset)
                {
                    Debug.WriteLine("left");
                    ws.sendMsg("left");
                    this.isReset = false;
                }

                if (rightHand.Position.Y < head.Position.Y && leftHand.Position.Y < head.Position.Y
                    && !this.isReset)
                {
                    this.isReset = true;
                }
            }
            
        }

        /// Handles the checking or unchecking of the seated mode combo box
        private void CheckBoxSeatedModeChanged(object sender, RoutedEventArgs e)
        {
            if (null != this.sensor)
            {
                if (this.checkBoxSeatedMode.IsChecked.GetValueOrDefault())
                {
                    this.sensor.SkeletonStream.TrackingMode = SkeletonTrackingMode.Seated;
                }
                else
                {
                    this.sensor.SkeletonStream.TrackingMode = SkeletonTrackingMode.Default;
                }
            }
        }
    }
}